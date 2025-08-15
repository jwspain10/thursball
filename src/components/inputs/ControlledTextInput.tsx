import { Control, Controller, FieldError, Path } from "react-hook-form";
import { TextInput } from "@mantine/core";

interface Props<T extends object> {
  control: Control<T>;
  inputName: Path<T>;
  label: string;
  placeholder?: string;
  withAsterisk?: boolean;
  defaultValue?: string;
  errors?: FieldError;
}

export default function ControlledTextInput<T extends object>({
  control,
  inputName,
  label,
  placeholder,
  withAsterisk = true,
  errors,
}: Props<T>) {
  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field: { name, value, onChange } }) => {
        return (
          <TextInput
            name={name}
            withAsterisk={withAsterisk}
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            error={errors?.message}
          />
        );
      }}
    />
  );
}
