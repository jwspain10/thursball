import { Group } from "@mantine/core";
import { BackButton } from "./BackButton";

interface Props {
  children: string | React.ReactNode;
  goBack?: boolean;
  button?: React.ReactNode;
}

export const SubHeader = ({ children, goBack, button }: Props) => {
  return (
    <Group justify="space-between" gap="xs">
      <Group gap="xs">
        {goBack && <BackButton />}
        <h2>{children}</h2>
      </Group>
      <div>{button}</div>
    </Group>
  );
};
