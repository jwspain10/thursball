"use server";

import { Role } from "@prisma/client";
import prisma from "../../../../lib/prisma";

export const updateUserRole = async (id: string, data: { role: Role }) => {
  const { role } = data;
  try {
    await prisma.user.update({
      where: { id },
      data: { role },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(`Failed to update user: ${error}`);
  }
};
