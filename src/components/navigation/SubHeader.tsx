import { Group, Text } from "@mantine/core";
import { BackButton } from "./BackButton";

interface Props {
  children: string | React.ReactNode;
  goBack?: boolean;
  button?: React.ReactNode;
}

export const SubHeader = ({ children, goBack, button }: Props) => {
  return (
    <Group justify="space-between" gap="xs">
      <Group gap="xs" mb={20}>
        {goBack && <BackButton />}
        <Text size="md"> {children}</Text>
      </Group>
      <div>{button}</div>
    </Group>
  );
};
