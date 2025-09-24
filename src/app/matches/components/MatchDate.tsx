import React from "react";
import { Text } from "@mantine/core";

interface Props {
  date: Date;
}

export default function MatchDate({ date }: Props) {
  return (
    <Text size="xs" ta="center" c="var(--mantine-color-blue-4)">
      {new Date(date).toDateString()}
    </Text>
  );
}
