import { Checkbox } from "@mantine/core";
import { Control, Controller, Path } from "react-hook-form";

interface Props<T extends object> {
  control: Control<T>;
  inputName: Path<T>;
  label: string;
  defaultValue?: boolean;
}

export default function ControlledCheckbox<T extends object>({
  control,
  inputName,
  label,
}: Props<T>) {
  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field: { name, value, onChange } }) => {
        return (
          <Checkbox
            label={label}
            name={name}
            checked={value}
            onChange={onChange}
          />
        );
      }}
    />
  );
}
