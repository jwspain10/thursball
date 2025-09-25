import React from "react";
import prisma from "../../../lib/prisma";
import { LinkButton } from "@/components/navigation/LinkButton";
import { NavLink, Stack } from "@mantine/core";
import MatchScoreBox from "./components/MatchScoreBox";
import { auth } from "../../../auth";
import { getAuthRole } from "@/utils/getAuthRole";
import MatchDate from "./components/MatchDate";

export default async function MatchesPage() {
  const session = await auth();
  const { isAdmin } = getAuthRole(session);
  const matches = await prisma.match.findMany({
    include: {
      team1: true,
      team2: true,
    },
    orderBy: {
      matchDate: "desc",
    },
  });
  return (
    <div>
      {isAdmin && <LinkButton link="/matches/add" label="Add Match" />}
      {matches.map((match) => {
        const { id, matchDate, team1, team2, scoreTeam1, scoreTeam2 } = match;
        return (
          <NavLink
            key={id}
            href={`/matches/${id}`}
            label={
              <Stack justify="center" gap="xs">
                <MatchDate date={matchDate} />
                <MatchScoreBox
                  nameTeam1={team1.name}
                  nameTeam2={team2.name}
                  scoreTeam1={scoreTeam1}
                  scoreTeam2={scoreTeam2}
                />
              </Stack>
            }
          />
        );
      })}
    </div>
  );
}
