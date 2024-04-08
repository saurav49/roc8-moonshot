import { z } from "zod";
export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});
export const signupFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4).max(20),
});
export const categorySchema = z.object({
  id: z.string(),
});
export const addCategorySchema = z.object({
  email: z.string().email(),
  category: categorySchema,
});
