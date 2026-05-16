import { cache } from "react";
import prisma from "../../../../lib/prisma";

export const PAGE_SIZE = 5;

export const fetchMatchesCount = cache(async () => {
  return prisma.match.count();
});

export const fetchMatches = cache(
  async ({ page = 1 }: { page?: number } = {}) => {
    return prisma.match.findMany({
      include: {
        team1: true,
        team2: true,
      },
      orderBy: {
        matchDate: "desc",
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });
  },
);
