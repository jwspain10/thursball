import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  createTheme,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import { SessionProvider } from "next-auth/react";
import { AppLayout } from "@/components/navigation/AppLayout";
import { font } from "@/app/theme/font";
import { components } from "@/app/theme/components";

export const metadata = {
  title: "Thursball",
  description: "Results and Stats",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    fontFamily: `Lexend, sans-serif`,
    primaryColor: "teal",
    components: components,
  });

  return (
    <html lang="en" {...mantineHtmlProps} data-mantine-color-scheme="dark">
      <head></head>
      <body className={font.className}>
        <ColorSchemeScript defaultColorScheme="dark" />
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <SessionProvider>
            <Notifications />
            <ModalsProvider>
              <AppLayout>{children}</AppLayout>
            </ModalsProvider>
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
