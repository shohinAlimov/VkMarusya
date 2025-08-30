import z from "zod";

export const schema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(15, "Name cannot exceed 15 characters"),
    surname: z
      .string()
      .min(4, "Surname must be at least 4 characters long")
      .max(15, "Surname cannot exceed 15 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(15, "Password cannot exceed 15 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // This attaches the error to the confirmPassword field
  });

export type FormFields = z.infer<typeof schema>;
