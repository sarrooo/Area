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