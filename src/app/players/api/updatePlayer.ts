"use server";

import { revalidatePath } from "next/cache";

import { IPlayer } from "@/app/types";
import prisma from "../../../../lib/prisma";

export const updatePlayer = async (id: string, data: IPlayer) => {
  try {
    await prisma.player.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.error("Error updating player:", error);
    throw new Error(`Failed to update player: ${error}`);
  }

  revalidatePath("/players");
};
