import { IUser } from "~/types/user";

declare global {
    namespace Express {
        interface Request {
            user: Partial<IUser>
        }
    }
}