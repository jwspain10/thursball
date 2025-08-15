import { useRef } from "react";
import { NumberInput, Group, Button, NumberInputHandlers } from "@mantine/core";

interface Props {
  label?: string;
  placeholder?: string;
  onChange?: (value: number | string) => void | undefined;
  step?: number;
  min?: number;
  max?: number;
  defaultValue?: number;
}

export default function CustomNumberInput({
  label,
  placeholder,
  onChange,
  step = 1,
  min = 0,
  max = 100,
}: Props) {
  const handlersRef = useRef<NumberInputHandlers>(null);
  return (
    <>
      <NumberInput
        hideControls
        label={label}
        onChange={onChange}
        placeholder={placeholder}
        handlersRef={handlersRef}
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
}
