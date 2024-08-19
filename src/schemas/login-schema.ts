import { z } from "zod";

export const loginSchema = () => {
  return z.object({
    email: z
      .string()
      .trim()
      .min(1, "Enter valid email address")
      .email("Not valid email address"),
    phone: z
      .string()
      // .regex(/^\+?\d(?: \d)*$/)
      .length(16, "Phone must be at 12 digits"),
    username: z
      .string()
      .trim()
      .min(4, "Username must be at least 4 characters")
      .max(20, "Username max length 20 characters"),
  });
};

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
