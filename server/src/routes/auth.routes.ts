import { Router } from 'express';
import {LoginUserInput, loginUserSchema, RegisterUserInput, registerUserSchema} from "~/schemas/user.schema";
import {validate} from "~/middlewares/validate";

const authRoutes = Router();

authRoutes.post('/login', validate(loginUserSchema), (req, res) => {
    const { email, password }: LoginUserInput = req.body;
    res.json({ message: 'Hello World' });
});

authRoutes.post('/register', validate(registerUserSchema), (req, res) => {
    const { name, email, password }: RegisterUserInput = req.body;
    res.json({ message: 'Login' });
});


export default authRoutes;