import { number, object, string } from "zod";

// Create Trigger Output Type : POST /output/trigger
export const createTriggerOutputTypeSchema = object({
    body: object({
        id: number().optional(),
        trigger_id: number({
            required_error: "Trigger id is required",
        }),
        name: string({
            required_error: "Name is required",
        }),
        description: string().optional(),
        type: string({
            required_error: "Type is required",
        }),
        value: string().optional()
    })
});

// Read Trigger Output Type : GET /output/trigger/:id
export const readTriggerOutputTypeSchema = object({
    params: object({
        id: number({
            required_error: "Trigger Output Type id is required",
        })
    })
});

// Search Trigger Output Type : GET /output/trigger
export const searchTriggerOutputTypeSchema = object({
    body: object({
        max: number().optional()
    })
});