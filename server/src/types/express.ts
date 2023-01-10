import { IUser } from "./user";

declare global {
    namespace Express {
        export interface Request {
            user: Partial<IUser>
        }
    }
}