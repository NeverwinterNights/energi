import { passwordRegex } from "@/consts/regex";
import { z } from "zod";

export const createUserModalSchema = () => {
  return z.object({
    email: z.string().trim().min(3).max(30).email(),
    firstName: z
      .string()
      .trim()
      .min(2, "First Name must be at least 2 characters")
      .max(20, "First Name max length 20 characters"),
    lastName: z
      .string()
      .trim()
      .min(2, "Last Name must be at least 2 characters")
      .max(20, "Last Name max length 20 characters"),
    password: z
      .string()
      .regex(
        passwordRegex,
        "Password must contain 0-9, a-z, A-Z, ! \" # $ % & \\' ( ) * + , - . / : ; < = > ? @ [ \\\\ ] ^' +\n" +
          "      ' _` { | } ~",
      )
      .trim()
      .min(6, "Password must be at least 6 characters"),
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
  // .transform(({ phone, ...rest }) => {
  //   console.log("transform");
  //   return {
  //     ...rest,
  //     phone: phone.replace(/^(\+\d{3})(\d{2})(\d{3})(\d{3})$/, "$1 $2 $3 $4"),
  //   };
  // });
};

export type CreateUserFormValues = z.infer<
  ReturnType<typeof createUserModalSchema>
>;
