import { z } from "zod";

import { LocaleType } from "locales/ru";

export const loginSchema = (t: LocaleType) => {
  return z.object({
    email: z
      .string()
      .trim()
      .min(1, t.errors.nonemptyEmail)
      .email(t.errors.regexEmail),
    password: z
      .string()
      .trim()
      .min(1, t.errors.nonemptyPassword)
      .min(3, t.errors.minPassword(3)),
  });
};

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
