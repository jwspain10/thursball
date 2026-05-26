"use client";

import { AppShell, Avatar, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { NavLinks } from "./NavLinks";

const PAGE_TITLES: Record<string, string> = {
  matches: "Matches",
  players: "Players",
  admin: "Admin",
};

interface Props {
  children: React.ReactNode;
}

export function AppLayout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const section = pathname.split("/")[1];
  const title = PAGE_TITLES[section] ?? "";

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            {title && (
              <Text fw={700} size="xl">
                {title}
              </Text>
            )}
          </Group>
          {status === "authenticated" && session?.user?.image && (
            <Avatar
              src={session.user.image}
              alt={session.user.name ?? "User"}
              radius="xl"
              size="sm"
            />
          )}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLinks />
      </AppShell.Navbar>
      <AppShell.Main style={{ marginBottom: "20px" }}>{children}</AppShell.Main>
    </AppShell>
  );
}
