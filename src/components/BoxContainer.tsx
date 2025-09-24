import { Box, Text } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
}

export default function BoxContainer({ title, children }: Props) {
  return (
    <Box bd="0.5px solid gray.5" bdrs="sm" p={4} mb={4}>
      <Text fw={600}>{title}</Text>
      {children}
    </Box>
  );
}
