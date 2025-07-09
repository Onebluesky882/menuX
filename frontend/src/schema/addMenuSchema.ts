import z from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(1, "require")
    .transform((val) => val.trim()),
  price: z.coerce.number().min(1, "require"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  isAvailable: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export type QuickAddMenu = z.infer<typeof schema>;
