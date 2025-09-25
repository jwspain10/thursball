import React from "react";
import { Text } from "@mantine/core";

interface Props {
  date: Date;
}

export default function MatchDate({ date }: Props) {
  return (
    <Text size="xs" ta="center" c="var(--mantine-color-teal-4)">
      {new Date(date).toDateString()}
    </Text>
  );
}
