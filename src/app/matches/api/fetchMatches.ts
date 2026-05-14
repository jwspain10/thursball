import { cache } from "react";
import prisma from "../../../../lib/prisma";

export const PAGE_SIZE = 5;

export const fetchMatches = cache(
  async ({ page = 1 }: { page?: number } = {}) => {
    const [matches, total] = await prisma.$transaction([
      prisma.match.findMany({
        include: {
          team1: true,
          team2: true,
        },
        orderBy: {
          matchDate: "desc",
        },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      prisma.match.count(),
    ]);

    return { matches, total };
  },
);
