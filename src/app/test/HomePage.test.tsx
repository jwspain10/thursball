import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../page";
import { SESSION_MOCK } from "../../../mocks/auth/session-mock";

// Mock SignIn and SignOut components
jest.mock("../../components/SignIn", () => {
  const SignIn = () => <div data-testid="SignIn" />;
  return SignIn;
});
jest.mock("../../components/SignOut", () => {
  const SignOut = () => <div data-testid="SignOut" />;
  return SignOut;
});

// Mock Mantine Box and Center to avoid rendering issues
jest.mock("@mantine/core", () => ({
  Box: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="Box">{children}</div>
  ),
  Center: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="Center">{children}</div>
  ),
}));

const mockAuth = jest.fn();
jest.mock("../../../auth", () => ({
  auth: () => mockAuth(),
}));

describe("HomePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows logged in message and SignOut when admin session exists", async () => {
    mockAuth.mockResolvedValue(SESSION_MOCK.ADMIN);

    render(await HomePage());

    expect(
      await screen.findByText(
        `You are currently logged in as ${SESSION_MOCK.ADMIN.user.name} with role ${SESSION_MOCK.ADMIN.user.role}`
      )
    ).toBeInTheDocument();
    expect(screen.queryByTestId("SignOut")).toBeInTheDocument();
    expect(screen.queryByTestId("SignIn")).not.toBeInTheDocument();
  });
  it("shows logged in message and SignOut when user session exists", async () => {
    mockAuth.mockResolvedValue(SESSION_MOCK.USER);

    render(await HomePage());

    expect(
      await screen.findByText(
        `You are currently logged in as ${SESSION_MOCK.USER.user.name} with role ${SESSION_MOCK.USER.user.role}`
      )
    ).toBeInTheDocument();
    expect(screen.queryByTestId("SignOut")).toBeInTheDocument();
    expect(screen.queryByTestId("SignIn")).not.toBeInTheDocument();
  });

  it("shows not logged in message and SignIn when session is null", async () => {
    mockAuth.mockResolvedValue(null);

    render(await HomePage());
    expect(
      await screen.findByText("You are not currently logged in")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("SignIn")).toBeInTheDocument();
    expect(screen.queryByTestId("SignOut")).not.toBeInTheDocument();
  });
});
