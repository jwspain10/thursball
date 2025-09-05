import { Text, Box } from "@mantine/core";
import { IMatchResponse } from "../types";
import MatchScoreBox from "./MatchScoreBox";

interface Props {
  match: IMatchResponse;
}

export default function MatchDetails({ match }: Props) {
  const { team1, team2, scoreTeam1, scoreTeam2, matchDate } = match;
  return (
    <Box>
      <Text size="xs" ta="center">
        {new Date(matchDate).toDateString()}
      </Text>
      <MatchScoreBox
        nameTeam1={team1.name}
        nameTeam2={team2.name}
        scoreTeam1={scoreTeam1}
        scoreTeam2={scoreTeam2}
      />
    </Box>
  );
}
