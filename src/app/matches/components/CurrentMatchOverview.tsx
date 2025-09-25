import { Box } from "@mantine/core";
import { useFormContext } from "../providers/FormProvider";
import MatchScoreBox from "./MatchScoreBox";
import MatchDate from "./MatchDate";

export default function CurrentMatchOverview() {
  const formContext = useFormContext();
  const { matchDetails, matchPlayerIds } = formContext || {};

  return (
    matchDetails && (
      <Box>
        <MatchDate date={matchDetails.matchDate} />
        <MatchScoreBox
          nameTeam1={matchDetails.nameTeam1}
          nameTeam2={matchDetails.nameTeam2}
          scoreTeam1={matchDetails.scoreTeam1}
          scoreTeam2={matchDetails.scoreTeam2}
        />
      </Box>
    )
  );
}
