"use server";

import prisma from "../../../lib/prisma";

export const fetchMatch = async (id: string) =>
  await prisma.match.findUnique({
    where: { id },
    include: {
      team1: {
        include: {
          teamPlayers: {
            include: {
              player: true,
            },
          },
        },
      },
      team2: {
        include: {
          teamPlayers: {
            include: {
              player: true,
            },
          },
        },
      },
      MatchPlayerStats: {
        include: {
          player: true,
          team: true,
        },
      },
    },
  });
