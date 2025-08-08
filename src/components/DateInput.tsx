import { DatePickerInput } from "@mantine/dates";

interface Props {
  value?: string | null;
  setValue?: (value: string | null) => void;
}

export default function DateInput({ value, setValue }: Props) {
  return (
    <DatePickerInput
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
    />
  );
}
