import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { SessionProvider } from "next-auth/react";
import { AppLayout } from "@/components/navigation/AppLayout";
import { theme } from "./theme";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <SessionProvider>
        <Notifications />
        <ModalsProvider>
          <AppLayout>{children}</AppLayout>
        </ModalsProvider>
      </SessionProvider>
    </MantineProvider>
  );
}
