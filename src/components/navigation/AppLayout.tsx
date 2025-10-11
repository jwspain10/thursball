"use client";

import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLinks } from "./NavLinks";

interface Props {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLinks />
      </AppShell.Navbar>
      <AppShell.Main style={{ marginBottom: "20px" }}>{children}</AppShell.Main>
    </AppShell>
  );
}
