"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma";
import { IMatchSubmitInput } from "../types";

interface Args {
  id: string;
  team1Id: string;
  team2Id: string;
  data: IMatchSubmitInput;
}

export const updateMatch = async ({ id, team1Id, team2Id, data }: Args) => {
  try {
    const {
      matchDate,
      scoreTeam1,
      scoreTeam2,
      nameTeam1,
      nameTeam2,
      team1Players,
      team2Players,
    } = data;

    await prisma.match.update({
      where: { id },
      data: {
        scoreTeam1,
        scoreTeam2,
        matchDate: new Date(matchDate),
      },
    });

    await prisma.team.update({
      where: { id: team1Id },
      data: { name: nameTeam1 },
    });
    await prisma.team.update({
      where: { id: team2Id },
      data: { name: nameTeam2 },
    });

    await prisma.teamPlayer.deleteMany({ where: { teamId: team1Id } });
    await prisma.teamPlayer.createMany({
      data: team1Players.map((p) => ({
        teamId: team1Id,
        playerId: p.playerId,
      })),
    });

    await prisma.teamPlayer.deleteMany({ where: { teamId: team2Id } });
    await prisma.teamPlayer.createMany({
      data: team2Players.map((p) => ({
        teamId: team2Id,
        playerId: p.playerId,
      })),
    });

    await prisma.matchPlayerStats.deleteMany({ where: { matchId: id } });
    await prisma.matchPlayerStats.createMany({
      data: [
        ...team1Players.map((p) => ({
          matchId: id,
          teamId: team1Id,
          playerId: p.playerId,
          goals: p.goals,
          assists: p.assists,
        })),
        ...team2Players.map((p) => ({
          matchId: id,
          teamId: team2Id,
          playerId: p.playerId,
          goals: p.goals,
          assists: p.assists,
        })),
      ],
    });

    revalidatePath("/matches");
    revalidatePath(`/matches/${id}`);
    revalidatePath("/stats");
  } catch (error) {
    console.error("Error updating match:", error);
    throw new Error(`Failed to update match: ${error}`);
  }
};
