import { Control, Controller, FieldError, Path } from "react-hook-form";
import { Checkbox } from "@mantine/core";

interface Props<T extends object> {
  control: Control<T>;
  inputName: Path<T>;
  label: string;
  defaultValue?: boolean;
  errors?: FieldError;
}

export default function ControlledCheckbox<T extends object>({
  control,
  inputName,
  label,
  errors,
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
            error={errors?.message}
          />
        );
      }}
    />
  );
}
