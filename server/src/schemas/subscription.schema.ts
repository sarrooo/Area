import { boolean, number, object } from "zod";

// Set subscribed : POST /subscription
export const setSubscribedSchema = object({
    body: object({
        serviceId: number({
            required_error: "Service id is required",
        }),
        subscribed: boolean({
            required_error: "Subscribed is required",
        }),
    }),
})