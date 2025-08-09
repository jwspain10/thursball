"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../lib/prisma";
import { IPlayer } from "@/app/types";

export const createPlayer = async (data: IPlayer) => {
  try {
    await prisma.player.create({
      data,
    });
    revalidatePath("/players");
  } catch (error) {
    console.error("Error creating player:", error);
    throw new Error(`Failed to create player: ${error}`);
  }
};
