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
  Stack: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="Stack">{children}</div>
  ),
  Title: ({ children }: { children?: React.ReactNode }) => (
    <h1 data-testid="Title">{children}</h1>
  ),
  Text: ({ children }: { children?: React.ReactNode }) => (
    <span data-testid="Text">{children}</span>
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
      await screen.findByText(`Logged in as ${SESSION_MOCK.ADMIN.user.name}`),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("SignOut")).toBeInTheDocument();
    expect(screen.queryByTestId("SignIn")).not.toBeInTheDocument();
  });
  it("shows logged in message and SignOut when user session exists", async () => {
    mockAuth.mockResolvedValue(SESSION_MOCK.USER);

    render(await HomePage());

    expect(
      await screen.findByText(`Logged in as ${SESSION_MOCK.USER.user.name}`),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("SignOut")).toBeInTheDocument();
    expect(screen.queryByTestId("SignIn")).not.toBeInTheDocument();
  });

  it("shows not logged in message and SignIn when session is null", async () => {
    mockAuth.mockResolvedValue(null);

    render(await HomePage());
    expect(screen.queryByTestId("SignIn")).toBeInTheDocument();
    expect(screen.queryByTestId("SignOut")).not.toBeInTheDocument();
  });
});
