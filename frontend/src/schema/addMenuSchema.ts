import z from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(1, "require")
    .transform((val) => val.trim()),
  price: z.coerce.number().min(1, "require"),
});

export type QuickAddMenu = z.infer<typeof schema>;
