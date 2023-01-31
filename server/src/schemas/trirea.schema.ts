import { array, number, object, string } from "zod";

// Create Trirea : POST /trirea
export const createTrireaSchema = object({
    body: object({
        id: number().optional(),
        enabled: number({
            required_error: "Enabled is required",
        }),
        userId: number().optional(),
        triggerId: number({
            required_error: "Trigger Id is required",
        }),
        reactionId: number({
            required_error: "Reaction Id is required",
        }),
        triggerInputs: array(object({
            id: number().optional(),
            value: string().optional(),
            trireadId: number({
                required_error: "Trirea Id is required in trigger inputs"
            }),
            triggerInputTypeId: number({
                required_error: "Trigger Input Type Id is required in trigger inputs"
            })
        })),
        reactionInputs: array(object({
            id: number().optional(),
            value: string().optional(),
            triggerOutputTypeId: string({
                required_error: "trigger Output Id is required in reaction inputs"
            }),
            trireaId: number({
                required_error: "Trirea Id is required in reaction inputs"
            }),
            reactionInputTypeId: number({
                required_error: "Reaction Input Type Id is required in reaction inputs"
            })
        }))
    }),
});

// Read Trirea : GET /trirea/:id
export const readTrireaSchema = object({
    params: object({
        id: number({
            required_error: "Id is required",
        }),
    }),
});

// Update Trirea : POST /trirea/:id
export const updateTrireaSchema = object({
    params: object({
        id: number({
            required_error: "Id is required",
        }),
    }),
    body: object({
        enabled: number({
            required_error: "Enabled is required",
        }),
        userId: number().optional(),
        triggerId: number({
            required_error: "Trigger Id is required",
        }),
        reactionId: number({
            required_error: "Reaction Id is required",
        }),
        triggerInputs: array(object({
            id: number().optional(),
            value: string().optional(),
            trireadId: number({
                required_error: "Trirea Id is required in trigger inputs"
            }),
            triggerInputTypeId: number({
                required_error: "Trigger Input Type Id is required in trigger inputs"
            })
        })),
        reactionInputs: array(object({
            id: number().optional(),
            value: string().optional(),
            triggerOutputTypeId: string({
                required_error: "trigger Output Id is required in reaction inputs"
            }),
            trireaId: number({
                required_error: "Trirea Id is required in reaction inputs"
            }),
            reactionInputTypeId: number({
                required_error: "Reaction Input Type Id is required in reaction inputs"
            })
        }))
    }),
});

// Delete Trirea : POST /trirea/delete/:id
export const deleteTrireaSchema = object({
    params: object({
        id: number({
            required_error: "Id is required",
        }),
    }),
});

// Search Trirea : GET /trirea
export const searchTrireaSchema = object({
    body: object({
        max: number().optional(),
        active: number().optional(),
        userId: number().optional(),
    }),
});