"use server";

import { IPlayer } from "@/app/types";
import prisma from "../../../lib/prisma";
import { revalidatePath } from "next/cache";

export const updatePlayer = async (id: string, data: IPlayer) => {
  try {
    await prisma.player.update({
      where: {
        id: +id,
      },
      data,
    });
  } catch (error) {
    console.error("Error updating player:", error);
    throw new Error(`Failed to update player: ${error}`);
  }

  revalidatePath("/players");
};
