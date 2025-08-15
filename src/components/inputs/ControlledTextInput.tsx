import { TextInput } from "@mantine/core";
import { Control, Controller, Path } from "react-hook-form";

interface Props<T extends object> {
  control: Control<T>;
  inputName: Path<T>;
  label: string;
  placeholder?: string;
  withAsterisk?: boolean;
  defaultValue?: string;
}

export default function ControlledTextInput<T extends object>({
  control,
  inputName,
  label,
  placeholder,
  withAsterisk = true,
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
          />
        );
      }}
    />
  );
}
