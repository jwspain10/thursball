import { Stack, Group } from "@mantine/core";
import { IMatchResponse } from "../types";

interface Props {
  match: IMatchResponse;
}

export default function MatchDetails({ match }: Props) {
  const { team1, team2, scoreTeam1, scoreTeam2, matchDate } = match;
  return (
    <div>
      <p>{new Date(matchDate).toLocaleDateString()}</p>
      <Stack bg="var(--mantine-color-body)" justify="flex-start" gap="xs">
        <Group justify="space-between" gap="xs">
          <div>{team1.name}</div>
          <div>{scoreTeam1}</div>
        </Group>

        <Group justify="space-between" gap="xs">
          <div>{team2.name}</div>
          <div>{scoreTeam2}</div>
        </Group>
      </Stack>
    </div>
  );
}
