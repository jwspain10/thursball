"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/prisma";

export const deleteMatch = async (id: string) => {
  try {
    await prisma.match.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting match:", error);
    throw new Error(`Failed to delete match: ${error}`);
  }

  revalidatePath("/matches");
};
