"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../lib/prisma";

export const deletePlayer = async (id: string) => {
  try {
    await prisma.player.delete({
      where: { id: +id },
    });
  } catch (error) {
    console.error("Error deleting player:", error);
    throw new Error(`Failed to delete player: ${error}`);
  }

  revalidatePath("/players");
};
