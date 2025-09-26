/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ControlledNumberInput from "../ControlledNumberInput";

// Mock Mantine NumberInput, Button, Flex
jest.mock("@mantine/core", () => ({
  NumberInput: jest.fn(
    ({
      label,
      placeholder,
      value,
      onChange,
      error,
      withAsterisk,
      name,
      step,
      min,
      max,
      handlersRef,
    }) => {
      // Expose handlers for increment/decrement
      if (handlersRef) {
        handlersRef.current = {
          increment: jest.fn(),
          decrement: jest.fn(),
        };
      }
      return (
        <div data-testid="NumberInput">
          <span data-testid="label">{label}</span>
          <span data-testid="placeholder">{placeholder}</span>
          <span data-testid="value">{value}</span>
          <span data-testid="error">{error}</span>
          <span data-testid="withAsterisk">{String(withAsterisk)}</span>
          <span data-testid="name">{name}</span>
          <span data-testid="step">{step}</span>
          <span data-testid="min">{min}</span>
          <span data-testid="max">{max}</span>
          <button data-testid="change" onClick={() => onChange(42)}>
            change
          </button>
        </div>
      );
    }
  ),
  Button: jest.fn(({ onClick, children, color }) => (
    <button data-testid={`btn-${color}`} onClick={onClick}>
      {children}
    </button>
  )),
  Flex: jest.fn(({ children }) => <div data-testid="Flex">{children}</div>),
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

describe("ControlledNumberInput", () => {
  const control = {
    value: 5,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders NumberInput with correct props", () => {
    render(
      <ControlledNumberInput
        control={control as any}
        inputName="numField"
        label="Number Label"
        placeholder="Enter number"
        step={2}
        min={1}
        max={10}
      />
    );
    expect(screen.getByTestId("label").textContent).toBe("Number Label");
    expect(screen.getByTestId("placeholder").textContent).toBe("Enter number");
    expect(screen.getByTestId("value").textContent).toBe("5");
    expect(screen.getByTestId("withAsterisk").textContent).toBe("true");
    expect(screen.getByTestId("name").textContent).toBe("numField");
    expect(screen.getByTestId("step").textContent).toBe("2");
    expect(screen.getByTestId("min").textContent).toBe("1");
    expect(screen.getByTestId("max").textContent).toBe("10");
  });

  it("passes error message to NumberInput", () => {
    render(
      <ControlledNumberInput
        control={control as any}
        inputName="numField"
        label="Number Label"
        errors={{ message: "Error!" } as any}
      />
    );
    expect(screen.getByTestId("error").textContent).toBe("Error!");
  });

  it("withAsterisk can be set to false", () => {
    render(
      <ControlledNumberInput
        control={control as any}
        inputName="numField"
        label="Number Label"
        withAsterisk={false}
      />
    );
    expect(screen.getByTestId("withAsterisk").textContent).toBe("false");
  });

  it("calls onChange when NumberInput changes", () => {
    render(
      <ControlledNumberInput
        control={control as any}
        inputName="numField"
        label="Number Label"
      />
    );
    fireEvent.click(screen.getByTestId("change"));
    expect(control.onChange).toHaveBeenCalledWith(42);
  });

  it("calls decrement handler when minus button is clicked", () => {
    render(
      <ControlledNumberInput
        control={control as any}
        inputName="numField"
        label="Number Label"
      />
    );
    // Button color "red" is for minus
    const minusBtn = screen.getByTestId("btn-red");
    fireEvent.click(minusBtn);
    // handlersRef.current.decrement is a jest.fn()
    const { NumberInput } = require("@mantine/core");
    const handlers = NumberInput.mock.calls[0][0].handlersRef.current;
    expect(handlers.decrement).toHaveBeenCalled();
  });

  it("calls increment handler when plus button is clicked", () => {
    render(
      <ControlledNumberInput
        control={control as any}
        inputName="numField"
        label="Number Label"
      />
    );
    // Button color "green" is for plus
    const plusBtn = screen.getByTestId("btn-green");
    fireEvent.click(plusBtn);
    const { NumberInput } = require("@mantine/core");
    const handlers = NumberInput.mock.calls[0][0].handlersRef.current;
    expect(handlers.increment).toHaveBeenCalled();
  });
});
