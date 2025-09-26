/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ControlledTextInput from "../ControlledTextInput";

// Mock Mantine TextInput
jest.mock("@mantine/core", () => ({
  TextInput: jest.fn(
    ({ label, placeholder, value, onChange, error, withAsterisk, name }) => (
      <div data-testid="TextInput">
        <span data-testid="label">{label}</span>
        <span data-testid="placeholder">{placeholder}</span>
        <span data-testid="value">{value}</span>
        <span data-testid="error">{error}</span>
        <span data-testid="withAsterisk">{String(withAsterisk)}</span>
        <span data-testid="name">{name}</span>
        <button
          data-testid="change"
          onClick={() => onChange({ target: { value: "new" } })}
        >
          change
        </button>
      </div>
    )
  ),
}));

// Mock react-hook-form Controller
jest.mock("react-hook-form", () => {
  const actual = jest.requireActual("react-hook-form");
  return {
    ...actual,

    Controller: ({ name, control, render }: any) =>
      render({
        field: {
          name,
          value: control.value,
          onChange: control.onChange,
        },
      }),
  };
});

describe("ControlledTextInput", () => {
  const control = {
    value: "test value",
    onChange: jest.fn(),
  };

  it("renders TextInput with correct props", () => {
    render(
      <ControlledTextInput
        control={control as any}
        inputName="field1"
        label="Test Label"
        placeholder="Test Placeholder"
      />
    );
    expect(screen.getByTestId("label").textContent).toBe("Test Label");
    expect(screen.getByTestId("placeholder").textContent).toBe(
      "Test Placeholder"
    );
    expect(screen.getByTestId("value").textContent).toBe("test value");
    expect(screen.getByTestId("withAsterisk").textContent).toBe("true");
    expect(screen.getByTestId("name").textContent).toBe("field1");
  });

  it("passes error message to TextInput", () => {
    render(
      <ControlledTextInput
        control={control as any}
        inputName="field1"
        label="Test Label"
        errors={{ message: "Error!" } as any}
      />
    );
    expect(screen.getByTestId("error").textContent).toBe("Error!");
  });

  it("withAsterisk can be set to false", () => {
    render(
      <ControlledTextInput
        control={control as any}
        inputName="field1"
        label="Test Label"
        withAsterisk={false}
      />
    );
    expect(screen.getByTestId("withAsterisk").textContent).toBe("false");
  });

  it("calls onChange when input changes", () => {
    render(
      <ControlledTextInput
        control={control as any}
        inputName="field1"
        label="Test Label"
      />
    );
    fireEvent.click(screen.getByTestId("change"));
    expect(control.onChange).toHaveBeenCalled();
  });
});
