"use server";

import prisma from "../../../../lib/prisma";

export const fetchPlayerStats = async (playerId: string) => {
  try {
    const stats = await prisma.matchPlayerStats.aggregate({
      where: { playerId },
      _sum: {
        goals: true,
        assists: true,
        conceded: true,
        mvp: true,
      },
      _count: { matchId: true },
    });

    return stats;
  } catch (error) {
    console.error("Error fetching player stats:", error);
  }
};
