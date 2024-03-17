import { z } from "zod";

export const create_user_schema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const update_password_schema = z.object({
  id: z.string(),
  code: z.number(),
  password: z.string(),
  confirmPassword: z.string(),
})