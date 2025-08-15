import { Control, Controller, FieldError, Path } from "react-hook-form";
import { DatePickerInput } from "@mantine/dates";

interface Props<T extends object> {
  control: Control<T>;
  inputName: Path<T>;
  label: string;
  placeholder?: string;
  withAsterisk?: boolean;
  defaultValue?: Date;
  errors?: FieldError;
}

export default function ControlledDateInput<T extends object>({
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
          <DatePickerInput
            withAsterisk={withAsterisk}
            name={name}
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={(value) => {
              if (typeof value === "string") {
                return onChange(new Date(value));
              }
              return onChange(value);
            }}
            maxDate={new Date()}
            error={errors?.message}
          />
        );
      }}
    />
  );
}
