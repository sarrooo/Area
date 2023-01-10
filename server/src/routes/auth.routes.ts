import { Router } from 'express';
import {LoginUserInput, loginUserSchema, RegisterUserInput, registerUserSchema} from "~/schemas/user.schema";
import {validate} from "~/middlewares/validate";
import {prisma} from "~/lib/prisma";
import {BadRequestException} from "~/utils/exceptions";
import bcrypt from 'bcrypt'

const authRoutes = Router();

authRoutes.post('/login', validate(loginUserSchema), async (req, res) => {
    const { email, password }: LoginUserInput = req.body;
    res.json({ message: 'Hello World' });
});

authRoutes.post('/register', validate(registerUserSchema), async (req, res) => {
    const { name, email, password }: RegisterUserInput = req.body;

    const userAlreadyExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (userAlreadyExist) {
        throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    res.json({ message: 'Login' });
});


export default authRoutes;