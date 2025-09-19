import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// generate random strings
const genString = (start: number, end: number) =>
  Math.random().toString(36).substring(start, end);

async function main() {
  console.log("🌱 Starting seed...");

  // --- 1. Create players ---

  const playerData = [
    {
      name: "Alice",
      lastName: "LastName",
      dob: "1992-04-12",
      nationality: "GB",
    },
    { name: "Bob", lastName: "LastName", dob: "1988-09-30", nationality: "US" },
    {
      name: "Charlie",
      lastName: "LastName",
      dob: "1995-06-22",
      nationality: "BR",
    },
    {
      name: "Dana",
      lastName: "LastName",
      dob: "1990-01-15",
      nationality: "DE",
    },
    { name: "Eve", lastName: "LastName", dob: "1993-11-05", nationality: "FR" },
    {
      name: "Frank",
      lastName: "LastName",
      dob: "1987-03-28",
      nationality: "IT",
    },
    {
      name: "Grace",
      lastName: "LastName",
      dob: "1996-12-17",
      nationality: "ES",
    },
    {
      name: "Hank",
      lastName: "LastName",
      dob: "1991-07-09",
      nationality: "NL",
    },
  ];

  const players = await Promise.all(
    playerData.map((player) =>
      prisma.player.create({
        data: { ...player, dob: new Date(player.dob), isActive: true },
      })
    )
  );

  console.log(`✅ Created ${players.length} players`);

  // --- 2. Create matches ---
  for (let week = 1; week <= 3; week++) {
    // Pick random players for each team
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    const team1Players = shuffled.slice(0, 4);
    const team2Players = shuffled.slice(4, 8);

    // Create team records
    const team1 = await prisma.team.create({
      data: { name: genString(week, week + 5) },
    });
    const team2 = await prisma.team.create({
      data: { name: genString(week, week + 5) },
    });

    // Link players to teams
    await prisma.teamPlayer.createMany({
      data: team1Players.map((p) => ({
        teamId: team1.id,
        playerId: p.id,
      })),
    });

    await prisma.teamPlayer.createMany({
      data: team2Players.map((p) => ({
        teamId: team2.id,
        playerId: p.id,
      })),
    });

    // Random score
    const scoreTeam1 = Math.floor(Math.random() * 6);
    const scoreTeam2 = Math.floor(Math.random() * 6);

    // Create match
    const match = await prisma.match.create({
      data: {
        team1Id: team1.id,
        team2Id: team2.id,
        scoreTeam1,
        scoreTeam2,
        matchDate: new Date(Date.now() - week * 7 * 24 * 60 * 60 * 1000), // each week ago
      },
    });

    // Add stats for each player
    for (const player of [...team1Players, ...team2Players]) {
      await prisma.matchPlayerStats.create({
        data: {
          matchId: match.id,
          playerId: player.id,
          teamId: team1Players.includes(player) ? team1.id : team2.id,
          goals: Math.floor(Math.random() * 3),
          assists: Math.floor(Math.random() * 2),
          mvp: Math.random() > 0.95 ? 1 : 0,
        },
      });
    }

    console.log(
      `⚽ Week ${week}: Match created with score ${scoreTeam1} - ${scoreTeam2}`
    );
  }

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
