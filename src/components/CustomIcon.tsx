import { ThemeIcon } from "@mantine/core";

interface Props {
  icon: React.ReactNode;
  color: string;
}

export default function CustomIcon({ icon, color }: Props) {
  return (
    <ThemeIcon variant="light" radius="xl" size="sm" color={color}>
      {icon}
    </ThemeIcon>
  );
}
