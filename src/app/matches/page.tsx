import React from "react";
import prisma from "../../../lib/prisma";
import { LinkButton } from "@/components/LinkButton";
import { Flex, NavLink } from "@mantine/core";
import MatchScoreBox from "./components/MatchScoreBox";

export default async function MatchesPage() {
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
      <LinkButton link="/matches/add" label="Add Match" />
      {matches.map((match) => {
        const { id, matchDate, team1, team2, scoreTeam1, scoreTeam2 } = match;
        return (
          <NavLink
            key={id}
            href={`/matches/${id}`}
            label={
              <Flex justify="center" align="center" direction="row">
                <MatchScoreBox
                  nameTeam1={team1.name}
                  nameTeam2={team2.name}
                  scoreTeam1={scoreTeam1}
                  scoreTeam2={scoreTeam2}
                />
              </Flex>
            }
            description={matchDate.toLocaleDateString()}
          />
        );
      })}
    </div>
  );
}
