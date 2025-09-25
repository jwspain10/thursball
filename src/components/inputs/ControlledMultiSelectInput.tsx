import { Control, Controller, FieldError, Path } from "react-hook-form";
import { MultiSelect } from "@mantine/core";
import { ISelectOptions } from "@/app/types";

interface Props<T extends object> {
  control: Control<T>;
  inputName: Path<T>;
  label: string;
  options: ISelectOptions[];
  placeholder?: string;
  withAsterisk?: boolean;
  defaultValue?: string[];
  errors?: FieldError;
}

export default function ControlledMultiSelectInput<T extends object>({
  control,
  inputName,
  label,
  placeholder,
  options,
  withAsterisk = true,
  errors,
}: Props<T>) {
  return (
    <Controller
      name={inputName}
      control={control}
      render={({ field: { name, value, onChange } }) => {
        return (
          <MultiSelect
            checkIconPosition="left"
            withAsterisk={withAsterisk}
            value={value}
            name={name}
            label={label}
            placeholder={placeholder}
            data={options}
            onChange={onChange}
            error={errors?.message}
            hidePickedOptions
          />
        );
      }}
    />
  );
}
