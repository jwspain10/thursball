import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

import { font } from "@/app/theme/font";
import { AppProviders } from "./AppProviders";

export const metadata = {
  title: "Thursball",
  description: "Results and Stats",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps} data-mantine-color-scheme="dark">
      <head></head>
      <body className={font.className}>
        <ColorSchemeScript defaultColorScheme="dark" />

        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
