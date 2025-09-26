import prisma from "../../../../lib/prisma";

export const fetchMatches = async () => {
  return prisma.match.findMany({
    include: {
      team1: true,
      team2: true,
    },
    orderBy: {
      matchDate: "desc",
    },
  });
};
