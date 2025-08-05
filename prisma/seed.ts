import prisma from "../lib/prisma";

async function main() {
  // Create Players
  const players = await prisma.player.createMany({
    data: [
      { name: "Alice" },
      { name: "Bob" },
      { name: "Charlie" },
      { name: "Dave" },
    ],
  });

  const allPlayers = await prisma.player.findMany();

  // Create Teams
  const teamA = await prisma.team.create({ data: {} });
  const teamB = await prisma.team.create({ data: {} });

  // Link Players to Teams (2 per team)
  await prisma.teamPlayer.createMany({
    data: [
      { playerId: allPlayers[0].id, teamId: teamA.id },
      { playerId: allPlayers[1].id, teamId: teamA.id },
      { playerId: allPlayers[2].id, teamId: teamB.id },
      { playerId: allPlayers[3].id, teamId: teamB.id },
    ],
  });

  // Create Matches
  await prisma.match.createMany({
    data: [
      {
        team1Id: teamA.id,
        team2Id: teamB.id,
        scoreTeam1: 2,
        scoreTeam2: 3,
        matchDate: new Date("2025-08-01T14:00:00Z"),
      },
      {
        team1Id: teamB.id,
        team2Id: teamA.id,
        scoreTeam1: 1,
        scoreTeam2: 1,
        matchDate: new Date("2025-08-02T14:00:00Z"),
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
