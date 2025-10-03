"use server";

import { cache } from "react";
import prisma from "../../../../lib/prisma";

export const fetchAllUsers = cache(async () => {
  try {
    const users = await prisma.user.findMany({});

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error(`Failed to fetch users: ${error}`);
  }
});
