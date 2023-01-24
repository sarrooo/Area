import { object, string, TypeOf } from "zod";

export const registerUserSchema = object({
  body: object({
    first_name: string({
      required_error: "First name is required",
    }),
    last_name: string({
      required_error: "Last name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be less than 32 characters"),
    password_confirmation: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email address"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Invalid email or password"),
  }),
});

export type RegisterUserInput = Omit<
  TypeOf<typeof registerUserSchema>["body"],
  "password_confirmation"
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
