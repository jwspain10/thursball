import Link from "next/link";
import { Button } from "@mantine/core";

interface Props {
  link: string;
  label: string;
}

export function LinkButton({ link, label }: Props) {
  return (
    <Button component={Link} href={link}>
      {label}
    </Button>
  );
}
