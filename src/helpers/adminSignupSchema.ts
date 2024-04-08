import * as z from "zod";

export const adminSignupSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" })
    .regex(/^\S*$/, { message: "Password should not contain white spaces" })
    .regex(/^[a-zA-Z0-9!@#$%&*_?]+$/, {
      message:
        "Password should only contain letters, numbers, and special characters like ! @ # $ % & * _?",
    }),
});

export type AdminSignupSchemaType = z.infer<typeof adminSignupSchema>;
