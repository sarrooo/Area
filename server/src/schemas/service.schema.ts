import { number, object, string } from "zod";

// Create Service : POST /service
export const createServiceSchema = object({
    body: object({
        id: number().optional(),
        name: string({
            required_error: "Name is required",
        }),
        description: string({
            required_error: "Description is required",
        }),
        image: string({
            required_error: "Image is required",
        }),
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