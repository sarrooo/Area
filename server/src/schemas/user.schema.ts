import { object, string, TypeOf } from "zod";

export const registerUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        email: string({
            required_error: "Email is required",
        }).email("Invalid email address"),
        password: string({
            required_error: "Password is required",
        })
            .min(8, "Password must be at least 8 characters")
            .max(32, "Password must be less than 32 characters"),
        passwordConfirmation: string({
            required_error: "Password confirmation is required",
        })
    }).refine(data => data.password === data.passwordConfirmation, {
        path: ["passwordConfirmation"],
        message: "Passwords do not match"
    })
});

export const loginUserSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).email("Invalid email address"),
        password: string({
            required_error: "Password is required",
        }).min(8, "Invalid email or password")
    })
});

export type RegisterUserInput = Omit<
    TypeOf<typeof registerUserSchema>['body'],
    'passwordConfirmation'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];