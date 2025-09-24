import { Box, Group, Text } from "@mantine/core";

interface Props {
  nameTeam1: string;
  nameTeam2: string;
  scoreTeam1: number;
  scoreTeam2: number;
}

export default function MatchScoreBox({
  nameTeam1,
  nameTeam2,
  scoreTeam1,
  scoreTeam2,
}: Props) {
  return (
    <Box>
      <Group justify="center" gap="xs">
        <Text>{nameTeam1}</Text>
        <Box m={4} p={8} bg="gray.1" bdrs={8} w={90}>
          <Group justify="center" gap="xs">
            <Text span fw="700" c="dark">
              {scoreTeam1}
            </Text>
            <Text span fw="700" c="gray.7">
              -
            </Text>
            <Text span fw="700" c="dark">
              {scoreTeam2}
            </Text>
          </Group>
        </Box>
        <Text>{nameTeam2}</Text>
      </Group>
    </Box>
  );
}
