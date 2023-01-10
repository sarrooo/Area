import { Router } from 'express';

const authRoutes = Router();

authRoutes.get('/login', (req, res) => {
    res.json({ message: 'Hello World' });
});

authRoutes.get('/register', (req, res) => {
    res.json({ message: 'Login' });
});


export default authRoutes;