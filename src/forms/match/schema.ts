import { z } from "zod/v4";

export const schema = z.object({
  matchDate: z.date(),
  team1Name: z
    .string()
    .min(2, { message: "Name should have at least 2 letters" }),
  team2Name: z
    .string()
    .min(2, { message: "Name should have at least 2 letters" }),
  team1Score: z
    .number()
    .int()
    .min(0, { message: "Score must be a non-negative integer" })
    .max(99, { message: "Score must be less than 100" }),
  team2Score: z
    .number()
    .int()
    .min(0, { message: "Score must be a non-negative integer" })
    .max(99, { message: "Score must be less than 100" }),
});
