import { Loader, Stack, Text } from "@mantine/core";

interface Props {
  label?: string;
}

export default function CustomLoader({ label }: Props) {
  return (
    <Stack
      h={150}
      bg="var(--mantine-color-body)"
      align="center"
      justify="center"
      gap="xs"
    >
      <Loader size="lg" />
      {label && <Text size="sm">{label}</Text>}
    </Stack>
  );
}
