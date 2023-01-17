import {Request, Response, Router} from 'express';
import {LoginUserInput, loginUserSchema, RegisterUserInput, registerUserSchema} from "~/schemas/user.schema";
import {validate} from "~/middlewares/validate";
import {prisma} from "~/lib/prisma";
import {BadRequestException, ForbiddenRequestException} from "~/utils/exceptions";
import {compare, hash} from 'bcrypt'
import {StatusCodes} from "http-status-codes";
import {sign, verify} from "jsonwebtoken";
import dotenv from 'dotenv';
import Logging from "~/lib/logging";

dotenv.config();

const authRoutes = Router();

authRoutes.post('/login', validate(loginUserSchema), async (req: Request, res: Response) => {
    const { email, password }: LoginUserInput = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (!user) {
        throw new BadRequestException('Invalid email or password');
    }

    const verifyPassword = await compare(password, user.password);
    if (!verifyPassword) {
        throw new BadRequestException('Invalid email or password');
    }

    // Set maxAge at 7days.
    // secure should be set to true in production, but it would work only in HTTPS
    const refreshToken = sign({ id: user.id,  email: user.email}, process.env.JWT_REFRESH_SECRET as string, {expiresIn: process.env.JWT_EXPIRES_IN_REFRESH_SECRET});
    res.cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 24 * 7, secure: false});

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7);
    await prisma.token.create({
        data: {
            userId: user.id,
            token: refreshToken,
            expiredAt: expiredAt
        }
    })

    const token = sign({ id: user.id, name: user.email }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN_SECRET });
    Logging.info(`User ${user.email} logged in`);
    res.status(StatusCodes.OK).json({ token });
});

authRoutes.post('/register', validate(registerUserSchema), async (req: Request, res:Response) => {
    const { first_name, last_name, email, password }: RegisterUserInput = req.body;

    const userAlreadyExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (userAlreadyExist) {
        throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
       data: {
           first_name: first_name,
           last_name: last_name,
           password: hashedPassword,
           email: email
       }
    });
    const { id } = newUser;
    Logging.info(`User ${email} register in`);
    return res.status(StatusCodes.CREATED).json({ id: id });
});

authRoutes.post('/refresh', async(req: Request, res: Response) => {
   const refreshToken = req.cookies['refreshToken'];
   if (!refreshToken) {
       throw new ForbiddenRequestException('No refresh token');
   }

   const payload: any = await verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
   if (!payload) {
       throw new ForbiddenRequestException('Invalid refresh token');
   }

   const dbRefreshToken = await prisma.token.findFirst({
      where: {
          userId: payload.id,
          expiredAt: {
              gte: new Date()
          }
      }
   });
   if (!dbRefreshToken) {
       throw new ForbiddenRequestException('Invalid refresh token');
   }

   const token = sign({ id: payload.id, name: payload.email }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN_SECRET });
   return res.status(StatusCodes.OK).json({ token });
});

authRoutes.post('/logout', async (req: Request, res: Response) => {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
        throw new ForbiddenRequestException('Already logout!');
    }

    await prisma.token.delete({
        where: {
            token: refreshToken
        }
    });

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', maxAge: 0, secure: false });
    return res.sendStatus(StatusCodes.NO_CONTENT);
});

export default authRoutes;