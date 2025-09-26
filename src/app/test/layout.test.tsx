import "@testing-library/jest-dom";

import React from "react";
import { render, screen } from "@testing-library/react";
import { AppProviders } from "../AppProviders";

jest.mock("@mantine/core", () => ({
  MantineProvider: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="MantineProvider">{children}</div>
  ),
}));
jest.mock("@mantine/notifications", () => ({
  Notifications: () => <div data-testid="Notifications" />,
}));
jest.mock("@mantine/modals", () => ({
  ModalsProvider: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="ModalsProvider">{children}</div>
  ),
}));
jest.mock("next-auth/react", () => ({
  SessionProvider: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="SessionProvider">{children}</div>
  ),
}));
jest.mock("../../components/navigation/AppLayout", () => ({
  __esModule: true,
  AppLayout: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="AppLayout">{children}</div>
  ),
}));
jest.mock("../theme", () => ({
  theme: {},
}));

describe("RootLayout", () => {
  it("renders children inside AppLayout", async () => {
    render(
      <AppProviders>
        <div data-testid="child">Child Content</div>
      </AppProviders>
    );
    const appLayout = await screen.findByTestId("AppLayout");
    const child = await screen.findByTestId("child");
    expect(appLayout).toContainElement(child);
  });
  it("renders without children", () => {
    render(<AppProviders>{null}</AppProviders>);
    expect(screen.getByTestId("AppLayout")).toBeInTheDocument();
  });
  it("renders MantineProvider, SessionProvider, Notifications, ModalsProvider", () => {
    render(
      <AppProviders>
        <div />
      </AppProviders>
    );
    expect(screen.getByTestId("MantineProvider")).toBeInTheDocument();
    expect(screen.getByTestId("SessionProvider")).toBeInTheDocument();
    expect(screen.getByTestId("Notifications")).toBeInTheDocument();
    expect(screen.getByTestId("ModalsProvider")).toBeInTheDocument();
  });
});
