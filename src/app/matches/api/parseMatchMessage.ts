"use server";

import { generateObject } from "ai";
import { createOpenAI as createGitHubModels } from "@ai-sdk/openai";
import { z } from "zod";

const githubModels = createGitHubModels({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN,
});

const playerEntrySchema = z.object({
  nameInMessage: z
    .string()
    .describe("Player name exactly as written in the message"),
  matchedId: z
    .string()
    .nullable()
    .describe(
      "The best matching player ID from the known players list, or null if no match found",
    ),
  confident: z
    .boolean()
    .describe(
      "true if you are sure of the match, false if there is reasonable doubt (e.g. two similar names like Alex/Aleks)",
    ),
  goals: z.number().int(),
  assists: z.number().int(),
  mvp: z.number().int().min(0).max(1),
});

const parsedMatchSchema = z.object({
  matchDate: z
    .string()
    .nullable()
    .describe(
      "Match date in ISO 8601 format (YYYY-MM-DD), or null if not mentioned",
    ),
  nameTeam1: z.string().describe("Name of team 1"),
  nameTeam2: z.string().describe("Name of team 2"),
  scoreTeam1: z.number().int(),
  scoreTeam2: z.number().int(),
  team1Players: z.array(playerEntrySchema).describe("Players on team 1"),
  team2Players: z.array(playerEntrySchema).describe("Players on team 2"),
});

export type ParsedMatchData = z.infer<typeof parsedMatchSchema>;
export type ParsedPlayerEntry = z.infer<typeof playerEntrySchema>;

export async function parseMatchMessage(
  message: string,
  players: { value: string; label: string }[],
): Promise<ParsedMatchData> {
  const roster = players.map((p) => `${p.value}: ${p.label}`).join("\n");

  try {
    const { object } = await generateObject({
      model: githubModels.chat("gpt-4o"),
      schema: parsedMatchSchema,
      prompt: `Extract football/soccer match details from this WhatsApp message.

Known players (id: name):
${roster}

Rules:
- Match each player name in the message to the best player ID in the known list.
- Set confident=false when there is reasonable doubt — e.g. "Alex" could be "Alex" or "Aleks", or "JC" could be "Joe C" or "James C".
- Set confident=true when the match is obvious.
- matchedId should be your best guess even when confident=false (it will be shown as a pre-selected suggestion to the user).
- Set matchedId=null only if no player in the list is a plausible match at all.
- goals/assists default to 0 if not mentioned. Only one player can have mvp=1.
- nameTeam1/nameTeam2: use actual names from the message (e.g. "Whites", "Darks"). Only use "Team 1"/"Team 2" if truly absent.
- matchDate in ISO 8601 (YYYY-MM-DD). Today is ${new Date().toISOString().split("T")[0]}.

Message:
${message}`,
    });

    return object;
  } catch (err) {
    console.error("[parseMatchMessage] error:", err);
    throw err;
  }
}
