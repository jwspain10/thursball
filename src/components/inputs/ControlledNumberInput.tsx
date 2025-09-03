import { useRef } from "react";
import { Control, Controller, FieldError, Path } from "react-hook-form";
import { NumberInput, Group, Button, NumberInputHandlers } from "@mantine/core";

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
  errors?: FieldError;
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
  errors,
}: Props<T>) {
  const handlersRef = useRef<NumberInputHandlers>(null);

  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field: { name, value, onChange } }) => {
        return (
          <Group mt="md" justify="center">
            <Button
              onClick={() => handlersRef.current?.decrement()}
              variant="default"
            >
              -
            </Button>
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
              error={errors?.message}
            />

            <Button
              onClick={() => handlersRef.current?.increment()}
              variant="default"
            >
              +
            </Button>
          </Group>
        );
      }}
    />
  );
}
