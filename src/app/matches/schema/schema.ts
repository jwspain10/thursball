import { z } from "zod/v4";

export const schema = z.object({
  matchDate: z.date().nullable(),
  nameTeam1: z
    .string()
    .min(2, { message: "Name should have at least 2 letters" }),
  nameTeam2: z
    .string()
    .min(2, { message: "Name should have at least 2 letters" }),
  scoreTeam1: z
    .number()
    .int()
    .min(0, { message: "Score must be a non-negative integer" })
    .max(99, { message: "Score must be less than 100" }),
  scoreTeam2: z
    .number()
    .int()
    .min(0, { message: "Score must be a non-negative integer" })
    .max(99, { message: "Score must be less than 100" }),
});

export const statsSchema = z.object({
  playerId: z.string(),
  player: z.object({
    name: z.string(),
  }),
  goals: z
    .number()
    .int()
    .min(0, { message: "Score must be a non-negative integer" })
    .max(99, { message: "Score must be less than 100" }),
  assists: z
    .number()
    .int()
    .min(0, { message: "Score must be a non-negative integer" })
    .max(99, { message: "Score must be less than 100" }),
  mvp: z
    .number()
    .int()
    .min(0, { message: "Score must be a non-negative integer" })
    .max(1, { message: "Score must be max 1" }),
});

export const matchPlayersSchema = z.object({
  team1Players: z.array(z.string()),
  team2Players: z.array(z.string()),
});
