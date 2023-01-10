import { Router } from 'express';
import {LoginUserInput, loginUserSchema, RegisterUserInput, registerUserSchema} from "~/schemas/user.schema";
import {validate} from "~/middlewares/validate";
import {prisma} from "~/lib/prisma";
import {BadRequestException} from "~/utils/exceptions";
import {compare, hash} from 'bcrypt'
import {StatusCodes} from "http-status-codes";
import {sign} from "jsonwebtoken";
import dotenv from 'dotenv';
import Logging from "~/lib/logging";

dotenv.config();

const authRoutes = Router();

authRoutes.post('/login', validate(loginUserSchema), async (req, res) => {
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
    const refreshToken = sign({ id: user.id,  email: user.email}, process.env.JWT_REFRESH_SECRET as string, {expiresIn: process.env.JWT_EXPIRES_IN_REFRESH_SECRET});
    res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7, secure: true});

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7);
    await prisma.token.create({
        data: {
            userId: user.id,
            token: refreshToken,
            expiredAt: expiredAt
        }
    })

    const token = sign({ id: user.id, name: user.email }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN_SECRET });
    Logging.info(`User ${user.email} logged in`);
    res.status(StatusCodes.OK).json({ token });
});

authRoutes.post('/register', validate(registerUserSchema), async (req, res) => {
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


export default authRoutes;