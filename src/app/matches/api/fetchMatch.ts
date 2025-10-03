"use server";

import prisma from "../../../../lib/prisma";

export const fetchMatch = async (id: string) =>
  await prisma.match.findUnique({
    where: { id },
    include: {
      team1: {
        include: {
          matchPlayerStats: {
            include: {
              player: {
                select: { name: true, lastName: true },
              },
            },
          },
        },
      },
      team2: {
        include: {
          matchPlayerStats: {
            include: {
              player: {
                select: { name: true, lastName: true },
              },
            },
          },
        },
      },
    },
  });
