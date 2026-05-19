"use server";

import prisma from "../../../../lib/prisma";

type TeamStat = {
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
};

export const fetchTeamStats = async () => {
  const matches = await prisma.match.findMany({
    select: {
      team1: { select: { name: true } },
      team2: { select: { name: true } },
      scoreTeam1: true,
      scoreTeam2: true,
    },
  });

  const statsMap = new Map<string, TeamStat>();

  const getOrCreate = (name: string): TeamStat => {
    if (!statsMap.has(name)) {
      statsMap.set(name, {
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
      });
    }
    return statsMap.get(name)!;
  };

  for (const match of matches) {
    const t1 = getOrCreate(match.team1.name);
    const t2 = getOrCreate(match.team2.name);

    t1.played++;
    t2.played++;
    t1.goalsFor += match.scoreTeam1;
    t1.goalsAgainst += match.scoreTeam2;
    t2.goalsFor += match.scoreTeam2;
    t2.goalsAgainst += match.scoreTeam1;

    if (match.scoreTeam1 > match.scoreTeam2) {
      t1.wins++;
      t2.losses++;
    } else if (match.scoreTeam1 === match.scoreTeam2) {
      t1.draws++;
      t2.draws++;
    } else {
      t1.losses++;
      t2.wins++;
    }
  }

  return Object.fromEntries(statsMap);
};
