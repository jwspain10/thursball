import { NavLink, Stack } from "@mantine/core";
import { fetchMatches } from "../api/fetchMatches";
import MatchDate from "./MatchDate";
import MatchScoreBox from "./MatchScoreBox";

interface Props {
  currentPage: number;
}

export default async function MatchesList({ currentPage }: Props) {
  const matches = await fetchMatches({ page: currentPage });

  return (
    <div>
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
