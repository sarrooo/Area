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

// Read Trigger : GET /trigger/:id
export const readTriggerSchema = object({
    params: object({
        id: number({
            required_error: "Trigger id is required",
        }),
    }),
});

// Update Trigger : POST /trigger/:id
export const updateTriggerSchema = object({
    params: object({
        id: number({
            required_error: "Trigger id is required",
        }),
    }),
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        description: string().optional(),
        serviceId: number({
            required_error: "Service id is required",
        }),
    }),
});

// Delete Trigger : POST /trigger/delete/:id
export const deleteTriggerSchema = object({
    params: object({
        id: number({
            required_error: "Trigger id is required",
        }),
    }),
});

// Search Trigger : GET /trigger
export const searchTriggerSchema = object({
    body: object({
        max: number().optional(),
    }),
});