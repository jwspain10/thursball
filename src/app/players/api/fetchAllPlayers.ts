"use server";

import { cache } from "react";
import prisma from "../../../../lib/prisma";

const PAGE_SIZE = 10;

export const fetchAllPlayers = cache(
  async ({ page = 1 }: { page?: number } = {}) => {
    try {
      const [players, total] = await prisma.$transaction([
        prisma.player.findMany({
          where: { isActive: true },
          orderBy: { name: "asc" },
          skip: (page - 1) * PAGE_SIZE,
          take: PAGE_SIZE,
        }),
        prisma.player.count({ where: { isActive: true } }),
      ]);

      return { players, total };
    } catch (error) {
      console.error("Error fetching players:", error);
      throw new Error(`Failed to fetch players: ${error}`);
    }
  },
);
