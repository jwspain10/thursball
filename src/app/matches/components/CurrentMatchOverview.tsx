import { useFormContext } from "../providers/FormProvider";

export default function CurrentMatchOverview() {
  const formContext = useFormContext();
  const { matchDetails, matchPlayerIds } = formContext || {};

  return (
    matchDetails &&
    matchPlayerIds && (
      <div>
        <div>{matchDetails.matchDate.toDateString()}</div>
        <div>
          Team 1: {matchDetails.nameTeam1} - {matchDetails.scoreTeam1}{" "}
        </div>
        <div>
          Team 2: {matchDetails.nameTeam2} - {matchDetails.scoreTeam2}{" "}
        </div>
        <div>Team 1 Players: {matchPlayerIds?.team1Players.length}</div>
        <div>Team 2 Players: {matchPlayerIds?.team2Players.length}</div>
      </div>
    )
  );
}
