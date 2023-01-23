import { number, object, string } from "zod";

// Create Trigger : POST /trigger
export const createTriggerSchema = object({
    body: object({
        id: number().optional(),
        name: string({
            required_error: "Name is required",
        }),
        description: string().optional(),
        serviceId: number({
            required_error: "Service id is required",
        }),
    })
});