import { number, object, string } from "zod";

// Create Service : POST /service
export const createServiceSchema = object({
    body: object({
        id: number().optional(),
        name: string({
            required_error: "Name is required",
        }),
        description: string().optional(),
        image: string().optional(),
        requiredSubscription: string({
            required_error: "Required Subscription is required",
        })
    })
});

// Read Service : GET /service/:id
export const readServiceSchema = object({
    params: object({
        id: number({
            required_error: "Id is required",
        }),
    }),
});

// Update Service : POST /service/:id
export const updateServiceSchema = object({
    params: object({
        id: number({
            required_error: "Id is required",
        }),
    }),
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        description: string().optional(),
        image: string().optional(),
        requiredSubscription: number({
            required_error: "Required Subscription is required",
        }),
    }),
});

// Delete Service : POST /service/delete/:id
export const deleteServiceSchema = object({
    params: object({
        id: number({
            required_error: "Id is required",
        }),
    }),
});

// Search Service : GET /service
export const searchServiceSchema = object({
    body: object({
        max: number().optional()
    })
});