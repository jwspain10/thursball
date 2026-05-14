"use server";

import prisma from "../../../../lib/prisma";

export const fetchPlayerOptions = async () => {
  const players = await prisma.player.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, lastName: true },
  });

  return players;
};
