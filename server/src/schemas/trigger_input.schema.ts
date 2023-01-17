import { number, object, string } from "zod";

// Create Trigger Intput Type : POST /input/trigger
export const createTriggerInputTypeSchema = object({
    body: object({
        id: number().optional(),
        trigger_id: number({
            required_error: "Trigger id is required",
        }),
        name: string({
            required_error: "Name is required",
        }),
        description: string().optional(),
        regex: string().optional(),
        mandatory: number().optional(),
        type: string({
            required_error: "Type is required",
        })
    })
})

// Read Trigger Input Type : GET /input/trigger/:id
export const readTriggerInputTypeSchema = object({
    params: object({
        id: number({
            required_error: "Trigger Input Type id is required",
        })
    })
})

// Update Trigger Input Type : POST /input/trigger/:id
export const updateTriggerInputTypeSchema = object({
    params: object({
        id: number({
            required_error: "Trigger Input Type id is required",
        })
    }),
    body: object({
        trigger_id: number({
            required_error: "Trigger id is required",
        }),
        name: string({
            required_error: "Name is required",
        }),
        description: string().optional(),
        regex: string().optional(),
        mandatory: number({
            required_error: "Mandatory is required",
        }),
        type: string({
            required_error: "Type is required",
        }),
    })
})