import React from "react";
import prisma from "../../../lib/prisma";
import { LinkButton } from "@/components/LinkButton";

export default async function MatchesPage() {
  const matches = await prisma.match.findMany({
    include: {
      team1: true,
      team2: true,
    },
  });
  return (
    <div>
      <LinkButton link="/matches/add" label="Add Match" />

      {matches.map((match) => {
        const { id, matchDate, team1, team2, scoreTeam1, scoreTeam2 } = match;
        return (
          <div key={id}>
            {team1.name} - {scoreTeam1} vs {scoreTeam2} - {team2.name} -{" "}
            {matchDate.toLocaleDateString()}
            <LinkButton link={`/matches/${match.id}`} label="View" />
          </div>
        );
      })}
    </div>
  );
}
