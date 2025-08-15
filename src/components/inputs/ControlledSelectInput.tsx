import { ISelectOptions } from "@/app/types";
import { Select } from "@mantine/core";
import { Control, Controller, Path } from "react-hook-form";

interface Props<T extends object> {
  control: Control<T>;
  inputName: Path<T>;
  label: string;
  options: ISelectOptions[];
  placeholder?: string;
  withAsterisk?: boolean;
  defaultValue?: string;
}

export default function ControlledSelectInput<T extends object>({
  control,
  inputName,
  label,
  placeholder,
  options,
  withAsterisk = true,
}: Props<T>) {
  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field: { name, value, onChange } }) => {
        return (
          <Select
            withAsterisk={withAsterisk}
            value={value}
            name={name}
            label={label}
            placeholder={placeholder}
            data={options}
            onChange={onChange}
          />
        );
      }}
    />
  );
}
