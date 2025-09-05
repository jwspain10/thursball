"use server";

import prisma from "../../../../lib/prisma";

export const fetchAllPlayers = async () => {
  try {
    const players = await prisma.player.findMany({ where: { isActive: true } });
    return players;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw new Error(`Failed to fetch players: ${error}`);
  }
};
