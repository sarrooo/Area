import { IUser } from "~/types/user";

declare global {
    namespace Express {
        export interface Request {
            user: Partial<IUser>
        }
    }
}