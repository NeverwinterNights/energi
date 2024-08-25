import { passwordRegex } from "@/consts/regex";
import { z } from "zod";

export const loginSchema = () => {
  return z.object({
    email: z
      .string()
      .trim()
      .min(1, "Enter valid email address")
      .email("Not valid email address"),
    password: z
      .string()
      .regex(
        passwordRegex,
        "Password must contain 0-9, a-z, A-Z, ! \" # $ % & \\' ( ) * + , - . / : ; < = > ? @ [ \\\\ ] ^' +\n" +
          "      ' _` { | } ~",
      )
      .trim()
      .min(6, "Password must be at least 6 characters"),
  });
};

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
