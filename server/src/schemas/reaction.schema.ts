import { number, object, string } from "zod";

// Create Reaction : POST /reaction
export const createReactionSchema = object({
    body: object({
        id: number().optional(),
        name: string({
            required_error: "Name is required",
        }),
        description: string().optional(),
        serviceId: number({
            required_error: "Service Id is required",
        }),
    }),
});

// Read Reaction : GET /reaction/:id
export const readReactionSchema = object({
    params: object({
        id: number({
            required_error: "Id is required",
        }),
    }),
});