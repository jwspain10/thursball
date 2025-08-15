"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../lib/prisma";
import { IMatchInput } from "@/app/types";
import { Match } from "@prisma/client";

export const createMatch = async (data: IMatchInput) => {
  const { matchDate, team1Name, team2Name, team1Score, team2Score } = data;

  // Create both teams
  const team1 = await prisma.team.create({
    data: { name: team1Name },
  });
  const team2 = await prisma.team.create({
    data: { name: team2Name },
  });

  // // Link players to teams
  // await prisma.teamPlayer.createMany({
  //   data: team1Players.map((p) => ({
  //     teamId: team1.id,
  //     playerId: p.playerId,
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
    scoreTeam1: team1Score,
    scoreTeam2: team2Score,
  } as unknown as Match;

  try {
    console.log("SERVER: ", matchData);

    await prisma.match.create({
      data: matchData,
    });
    revalidatePath("/matches");
  } catch (error) {
    console.error("Error creating match:", error);
    throw new Error(`Failed to create match: ${error}`);
  }
};
