import { number, object, string } from "zod";

// Create Reaction Input Type : POST /input/reaction
export const createReactionInputTypeSchema = object({
    body: object({
        id: number().optional(),
        reaction_id: number({
            required_error: "Reaction id is required",
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
});

// Read Reaction Input Type : GET /input/reaction/:id
export const readReactionInputTypeSchema = object({
    params: object({
        id: number({
            required_error: "Reaction Input Type id is required",
        })
    })
});

// Update Reaction Input Type : POST /input/reaction/:id
export const updateReactionInputTypeSchema = object({
    params: object({
        id: number({
            required_error: "Reaction Input Type id is required",
        })
    }),
    body: object({
        reaction_id: number({
            required_error: "Reaction id is required",
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
});