import { NumberInput, Group, Button, NumberInputHandlers } from "@mantine/core";
import { useRef } from "react";
import { Control, Controller, Path } from "react-hook-form";

interface Props<T extends object> {
  control: Control<T>;
  inputName: Path<T>;
  label: string;
  placeholder?: string;
  withAsterisk?: boolean;
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
}

export default function ControlledNumberInput<T extends object>({
  control,
  inputName,
  label,
  placeholder,
  withAsterisk = true,
  step = 1,
  min = 0,
  max = 99,
}: Props<T>) {
  const handlersRef = useRef<NumberInputHandlers>(null);

  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field: { name, value, onChange } }) => {
        return (
          <>
            <NumberInput
              handlersRef={handlersRef}
              name={name}
              withAsterisk={withAsterisk}
              label={label}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              step={step}
              min={min}
              max={max}
            />
            <Group mt="md" justify="center">
              <Button
                onClick={() => handlersRef.current?.decrement()}
                variant="default"
              >
                -
              </Button>

              <Button
                onClick={() => handlersRef.current?.increment()}
                variant="default"
              >
                +
              </Button>
            </Group>
          </>
        );
      }}
    />
  );
}
