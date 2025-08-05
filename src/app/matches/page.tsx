import React from "react";
import prisma from "../../../lib/prisma";

export default async function MatchesPage() {
  const matches = await prisma.match.findMany({
    include: {
      team1: true,
      team2: true,
    },
  });
  return (
    <div>
      {matches.map((match) => {
        const { id, matchDate, team1, team2, scoreTeam1, scoreTeam2 } = match;
        return (
          <div key={id}>
            {team1.id} - {scoreTeam1} vs {scoreTeam2} - {team2.id} -{" "}
            {matchDate.toLocaleDateString()}
          </div>
        );
      })}
    </div>
  );
}
