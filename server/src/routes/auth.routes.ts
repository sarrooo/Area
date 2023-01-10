import { Router } from 'express';
import {LoginUserInput, loginUserSchema, RegisterUserInput, registerUserSchema} from "~/schemas/user.schema";
import {validate} from "~/middlewares/validate";
import {prisma} from "~/lib/prisma";
import {BadRequestException} from "~/utils/exceptions";
import bcrypt from 'bcrypt'
import {StatusCodes} from "http-status-codes";

const authRoutes = Router();

authRoutes.post('/login', validate(loginUserSchema), async (req, res) => {
    const { email, password }: LoginUserInput = req.body;
    res.status(StatusCodes.OK).json({ message: 'Hello World' });
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
       data: {
           first_name: first_name,
           last_name: last_name,
           password: hashedPassword,
           email: email
       }
    });

    const { id } = newUser;

    return res.status(StatusCodes.CREATED).json({ id: id });
});


export default authRoutes;