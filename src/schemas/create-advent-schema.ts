import { z } from "zod";

export const createAdventSchema = () => {
  return z.object({
    title: z.string().trim().min(5),
    descriptions: z.string().trim().min(30),
    category: z.string().trim().min(5),
    price: z.string(),
  });
};

export type CreateAdventFormValues = z.infer<
  ReturnType<typeof createAdventSchema>
>;
