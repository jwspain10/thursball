"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma";
import { IMatchSubmitInput } from "../types";

export const createMatch = async (data: IMatchSubmitInput) => {
  try {
    const {
      matchDate,
      nameTeam1,
      nameTeam2,
      scoreTeam1,
      scoreTeam2,
      team1Players,
      team2Players,
    } = data;

    // --- Step 1: Create match + teams + players ---
    const match = await prisma.match.create({
      data: {
        scoreTeam1,
        scoreTeam2,
        matchDate: new Date(matchDate),
        team1: {
          create: {
            name: nameTeam1,
            teamPlayers: {
              create: team1Players.map((p) => ({
                player: { connect: { id: p.playerId } },
              })),
            },
          },
        },
        team2: {
          create: {
            name: nameTeam2,
            teamPlayers: {
              create: team2Players.map((p) => ({
                player: { connect: { id: p.playerId } },
              })),
            },
          },
        },
      },

      include: {
        team1: true,
        team2: true,
      },
    });

    const allStats = [
      ...team1Players.map((p) => ({
        matchId: match.id,
        teamId: match.team1Id,
        playerId: p.playerId,
        goals: p.goals,
        assists: p.assists,
        conceded: p.conceded,
        mvp: p.mvp,
      })),
      ...team2Players.map((p) => ({
        matchId: match.id,
        teamId: match.team2Id,
        playerId: p.playerId,
        goals: p.goals,
        assists: p.assists,
        conceded: p.conceded,
        mvp: p.mvp,
      })),
    ];

    await prisma.matchPlayerStats.createMany({ data: allStats });

    revalidatePath("/matches");
  } catch (error) {
    console.error("Error creating match:", error);
    throw new Error(`Failed to create match: ${error}`);
  }
};
