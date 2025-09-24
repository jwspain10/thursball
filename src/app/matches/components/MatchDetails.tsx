import { Box } from "@mantine/core";
import { IMatchResponse } from "../types";
import MatchScoreBox from "./MatchScoreBox";
import MatchDate from "./MatchDate";

interface Props {
  match: IMatchResponse;
}

export default function MatchDetails({ match }: Props) {
  const { team1, team2, scoreTeam1, scoreTeam2, matchDate } = match;
  return (
    <Box>
      <MatchDate date={matchDate} />
      <MatchScoreBox
        nameTeam1={team1.name}
        nameTeam2={team2.name}
        scoreTeam1={scoreTeam1}
        scoreTeam2={scoreTeam2}
      />
    </Box>
  );
}
