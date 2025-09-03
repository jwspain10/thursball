"use server";

import { revalidatePath } from "next/cache";
import { Match } from "@prisma/client";
import prisma from "../../../../lib/prisma";
import { IMatchSubmitInput } from "../types";

interface Args {
  id: string;
  team1Id: string;
  team2Id: string;
  data: IMatchSubmitInput;
}

export const updateMatch = async ({ id, team1Id, team2Id, data }: Args) => {
  const { matchDate, nameTeam1, nameTeam2, scoreTeam1, scoreTeam2 } = data;

  // Update both teams

  const team1 = await prisma.team.update({
    where: { id: team1Id },
    data: {
      name: nameTeam1,
    },
  });

  const team2 = await prisma.team.update({
    where: { id: team2Id },
    data: {
      name: nameTeam2,
    },
  });

  // Link players to teams
  // await prisma.teamPlayer.findMany({
  //   data: team1Players.map((playerId) => ({
  //     teamId: team1.id,
  //     playerId,
  //   })),
  // });

  // await prisma.teamPlayer.createMany({
  //   data: team2Players.map((playerId) => ({
  //     teamId: team2.id,
  //     playerId,
  //   })),
  // });

  // // Add player stats
  // const allPlayersStats = [
  //   ...team1Players.map((p) => ({
  //     matchId: match.id,
  //     playerId: p.playerId,
  //     teamId: team1.id,
  //     goals: p.goals,
  //     assists: p.assists,
  //     yellowCards: p.yellowCards,
  //     redCards: p.redCards,
  //   })),
  //   ...team2Players.map((p) => ({
  //     matchId: match.id,
  //     playerId: p.playerId,
  //     teamId: team2.id,
  //     goals: p.goals,
  //     assists: p.assists,
  //     yellowCards: p.yellowCards,
  //     redCards: p.redCards,
  //   })),
  // ];

  // await prisma.matchPlayerStats.createMany({ data: allPlayersStats });

  const matchData = {
    matchDate,
    team1Id: team1.id,
    team2Id: team2.id,
    scoreTeam1,
    scoreTeam2,
  } as unknown as Match;

  try {
    await prisma.match.update({
      where: { id },
      data: matchData,
    });
    revalidatePath("/matches");
  } catch (error) {
    console.error("Error creating match:", error);
    throw new Error(`Failed to create match: ${error}`);
  }
};
