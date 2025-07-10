import z from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(1, "require")
    .transform((val) => val.trim()),

  options: z
    .array(
      z.object({
        label: z.string().min(1, "label"),
        price: z.coerce.number().positive("price"),
      })
    )
    .min(1, "require 1 option"),
});

export type QuickAddMenu = z.infer<typeof schema>;
