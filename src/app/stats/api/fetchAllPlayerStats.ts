import prisma from "../../../../lib/prisma";

type PlayerRecord = {
  playerId: string;
  name: string;
  lastName: string | null;
  played: number;
  wins: number;
  losses: number;
  draws: number;
  goals: number;
  assists: number;
  conceded: number;
  mvps: number;
};

export async function fetchAllPlayerStats(): Promise<PlayerRecord[]> {
  // Step 1: Get all matches with players and stats
  const matches = await prisma.match.findMany({
    include: {
      team1: { include: { teamPlayers: { include: { player: true } } } },
      team2: { include: { teamPlayers: { include: { player: true } } } },
      matchPlayerStats: true,
    },
  });

  // Step 2: Build stats accumulator
  const statsMap = new Map<string, PlayerRecord>();

  const getOrCreate = (player: {
    id: string;
    name: string;
    lastName: string | null;
  }) => {
    if (!statsMap.has(player.id)) {
      statsMap.set(player.id, {
        playerId: player.id,
        name: player.name,
        lastName: player.lastName,
        played: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        goals: 0,
        assists: 0,
        conceded: 0,
        mvps: 0,
      });
    }
    return statsMap.get(player.id)!;
  };

  // Step 3: Process matches
  for (const match of matches) {
    const { scoreTeam1, scoreTeam2 } = match;

    // Determine result
    let team1Result: "win" | "loss" | "draw";
    let team2Result: "win" | "loss" | "draw";

    if (scoreTeam1 > scoreTeam2) {
      team1Result = "win";
      team2Result = "loss";
    } else if (scoreTeam1 < scoreTeam2) {
      team1Result = "loss";
      team2Result = "win";
    } else {
      team1Result = team2Result = "draw";
    }

    // Assign W/L/D to each player in team1
    for (const tp of match.team1.teamPlayers) {
      const rec = getOrCreate(tp.player);

      rec.played++;
      if (team1Result === "win") rec.wins++;
      if (team1Result === "loss") rec.losses++;
      if (team1Result === "draw") rec.draws++;
    }

    // Assign W/L/D to each player in team2
    for (const tp of match.team2.teamPlayers) {
      const rec = getOrCreate(tp.player);
      rec.played++;
      if (team2Result === "win") rec.wins++;
      if (team2Result === "loss") rec.losses++;
      if (team2Result === "draw") rec.draws++;
    }

    // Add goals/assists/mvps from playerStats
    for (const ps of match.matchPlayerStats) {
      const rec = statsMap.get(ps.playerId);
      if (!rec) continue;
      rec.goals += ps.goals;
      rec.assists += ps.assists;
      rec.conceded += ps.conceded;
      rec.mvps += ps.mvp ?? 0; // assuming mvps is an int field in MatchPlayerStats
    }
  }

  return Array.from(statsMap.values()).sort((a, b) => b.played - a.played);
}
