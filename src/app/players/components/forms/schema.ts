import { z } from "zod/v4";

export const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name should have at least 1 letter" }),
  nationality: z.string().min(2, { message: "Select a country" }),
  dob: z.date(),
  isActive: z.boolean(),
});
