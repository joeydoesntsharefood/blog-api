import { z } from "zod";

export const create_user_schema = z.object({
  name: z.string(),
  email: z.string().email(),
})