"use server";

import prisma from "../../../../lib/prisma";

export const fetchPlayerMatchStats = async (playerId: string) => {
  try {
    // all matches player participated in
    const participations = await prisma.match.findMany({
      where: {
        OR: [
          { team1: { teamPlayers: { some: { playerId } } } },
          { team2: { teamPlayers: { some: { playerId } } } },
        ],
      },
      include: {
        team1: { include: { teamPlayers: true } },
        team2: { include: { teamPlayers: true } },
      },
    });

    const played = participations.length;
    let wins = 0;
    let losses = 0;
    let draws = 0;

    for (const match of participations) {
      const inTeam1 = match.team1.teamPlayers.some(
        (tp) => tp.playerId === playerId
      );
      const inTeam2 = match.team2.teamPlayers.some(
        (tp) => tp.playerId === playerId
      );

      if (inTeam1) {
        if (match.scoreTeam1 > match.scoreTeam2) wins++;
        else if (match.scoreTeam1 < match.scoreTeam2) losses++;
        else draws++;
      }

      if (inTeam2) {
        if (match.scoreTeam2 > match.scoreTeam1) wins++;
        else if (match.scoreTeam2 < match.scoreTeam1) losses++;
        else draws++;
      }
    }

    return { played, wins, losses, draws };
  } catch (error) {
    console.error("Error fetching player stats:", error);
  }
};
