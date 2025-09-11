import { getAge } from "@/utils/getAge";
import { getCountry } from "@/utils/getCountry";
import { Avatar, Box, Group, Stack, Text } from "@mantine/core";
import ReactCountryFlag from "react-country-flag";
import prisma from "../../../../lib/prisma";
import { getName } from "@/utils/getName";

export default async function PlayerProfile({
  playerId,
}: {
  playerId: string;
}) {
  const player = await prisma.player.findUnique({
    where: { id: playerId },
  });

  const birthday = new Date(player?.dob || "");
  const { fullName } = getName(player?.name || "", player?.lastName || "");
  return (
    player && (
      <Box>
        <Group>
          <Box>
            <Avatar variant="light" radius="md" size="xl" />
          </Box>
          <Box>
            <Stack align="flex-start" justify="center" gap="xs">
              <Text size="xl" fw="900">
                {fullName}
              </Text>
              <Text size="sm">
                <ReactCountryFlag
                  svg
                  style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
                  countryCode={player.nationality}
                />
                {getCountry(player?.nationality || "")}, {getAge(birthday)}
              </Text>
            </Stack>
          </Box>
        </Group>
      </Box>
    )
  );
}
