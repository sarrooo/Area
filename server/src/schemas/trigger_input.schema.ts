import { boolean, number, object, string } from "zod";

// Create Trigger Intput Type : POST /input/trigger
export const createTriggerInputTypeSchema = object({
    body: object({
        id: number().optional(),
        triggerId: number({
            required_error: "Trigger id is required",
        }),
        name: string({
            required_error: "Name is required",
        }),
        description: string().optional(),
        regex: string().optional(),
        mandatory: boolean().optional(),
        type: string({
            required_error: "Type is required",
        })
    })
})

// Read Trigger Input Type : GET /input/trigger/:id
export const readTriggerInputTypeSchema = object({
    params: object({
        id: string({
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
        triggerId: number({
            required_error: "Trigger id is required",
        }),
        name: string({
            required_error: "Name is required",
        }),
        description: string().optional(),
        regex: string().optional(),
        mandatory: boolean({
            required_error: "Mandatory is required",
        }),
        type: string({
            required_error: "Type is required",
        }),
    })
})

// Delete Trigger Input Type : POST /input/trigger/delete/:id
export const deleteTriggerInputTypeSchema = object({
    params: object({
        id: number({
            required_error: "Trigger Input Type id is required",
        })
    })
});

// Search Trigger Input Type : GET /input/trigger
export const searchTriggerInputTypeSchema = object({
    body: object({
        max: number().optional()
    })
});