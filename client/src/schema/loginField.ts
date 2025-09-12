import z from "zod";
export const schema = z.object({
  email: z.email().transform(val => val.trim().toLowerCase()),
  password: z.string().transform(val => val.trim()),
});

export type LoginField = z.infer<typeof schema>;
