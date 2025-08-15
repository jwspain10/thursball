import { z } from "zod/v4";

export const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  nationality: z.string().min(2, { message: "Select a country" }),
  dob: z.string(),
  isActive: z.boolean(),
});
