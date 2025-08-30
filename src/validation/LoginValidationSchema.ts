import z from "zod";

export const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password cannot exceed 15 characters"),
});

export type FormFields = z.infer<typeof schema>;
