"use server";

import prisma from "../../../lib/prisma";

export const fetchPlayer = async (id: string) => {
  try {
    const player = await prisma.player.findUnique({
      where: { id },
    });
    return player;
  } catch (error) {
    console.error("Error fetching player:", error);
    throw new Error(`Failed to fetch player: ${error}`);
  }
};
