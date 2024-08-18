import { z } from "zod";

import { LocaleType } from "locales/ru";

export const banModalSchema = (t: LocaleType) => {
  // return z.object({
  //   reason: z.string().trim().min(1, t.errors.ban),
  //   // anotherReason: z.string().trim().min(1, t.errors.ban),
  // });

  return z
    .object({
      reason: z.string().trim().min(1, t.errors.ban),
      textArea: z.string().trim().min(1, t.errors.ban).max(100).optional(),
    })
    .superRefine((arg, ctx) => {
      if (arg.reason === t.banModal.another) {
        if (arg.textArea) {
          arg.reason = arg.textArea;
        }
      }
    });
};

export type BanFormValues = z.infer<ReturnType<typeof banModalSchema>>;
