import { z } from "zod";

export const createAdventSchema = () => {
  return z.object({
    title: z.string().trim().min(5),
    descriptions: z.string().trim().min(30),
    category: z.string().trim().min(8),
    price: z.number(),
  });
};

export type CreateAdventFormValues = z.infer<
  ReturnType<typeof createAdventSchema>
>;
