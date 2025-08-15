import { DatePickerInput } from "@mantine/dates";
import { Control, Controller, Path } from "react-hook-form";

interface Props<T extends object> {
  control: Control<T>;
  inputName: Path<T>;
  label: string;
  placeholder?: string;
  withAsterisk?: boolean;
  defaultValue?: string;
}

export default function ControlledDateInput<T extends object>({
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
          <DatePickerInput
            withAsterisk={withAsterisk}
            name={name}
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
