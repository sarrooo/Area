import {Request, Response, Router} from "express";
import {About} from "~/types/about";

const aboutRoutes = Router();

aboutRoutes.get('/about.json', async (req: Request, res: Response) => {
    let about: About = {
        client: {
            hostname: req.ip
        },
        server: {
            current_time: Date.now(),
            services: [
                {
                    name: 'Facebook',
                    actions: [],
                    reactions: [],
                }
            ]
        }
    }
    return res.status(200).json({ about });
});

export default aboutRoutes;