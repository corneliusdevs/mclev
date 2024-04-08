import * as z from "zod";

export const adminLoginSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username should be at least 6 characters long" })
    .regex(/^\S*$/, { message: "Username should not contain white spaces" })
    .regex(/^[a-zA-Z0-9!@#$%&*_?]+$/, {
      message:
        "Password should only contain letters, numbers, and special characters like ! @ # $ % & * _?",
    }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" })
    .regex(/^\S*$/, { message: "Password should not contain white spaces" })
    .regex(/^[a-zA-Z0-9!@#$%&*_?]+$/, {
      message:
        "Password should only contain letters, numbers, and special characters like ! @ # $ % & * _?",
    }),
});

export type AdminLoginSchemaType = z.infer<typeof adminLoginSchema>;
