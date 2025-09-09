"use client";

import { Box, Group, Skeleton, Stack } from "@mantine/core";

export default function PlayerProfileLoading() {
  return (
    <Box>
      <Group>
        <Box>
          <Skeleton circle height={84} mt={6} radius="xl" />
        </Box>
        <Box>
          <Stack align="flex-start" justify="center" gap="xs">
            <Skeleton height={34} width="150" radius="xl" />
            <Group>
              <div>
                <Skeleton height={24} width="24" />
              </div>
              <div>
                <Skeleton height={24} width="120" />
              </div>
              <div>
                <Skeleton height={12} radius="xl" />
              </div>
            </Group>
          </Stack>
        </Box>
      </Group>
    </Box>
  );
}
