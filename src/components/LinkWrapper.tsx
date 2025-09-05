import Link from "next/link";
import { Box } from "@mantine/core";
import { ReactElement } from "react";

interface Props {
  link: string;
  children: ReactElement;
}

export function LinkWrapper({ link, children }: Props) {
  return (
    <Box
      component={Link}
      href={link}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
      }}
    >
      {children}
    </Box>
  );
}
