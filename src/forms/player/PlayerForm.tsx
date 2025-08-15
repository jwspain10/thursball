"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group } from "@mantine/core";
import { getCountryOptions } from "@/utils/getCountryOptions";
import { schema } from "./schema";
import { IPlayerInput } from "@/app/types";
import ControlledTextInput from "@/components/inputs/ControlledTextInput";
import ControlledSelectInput from "@/components/inputs/ControlledSelectInput";
import ControlledDateInput from "@/components/inputs/ControlledDateInput";
import ControlledCheckbox from "@/components/inputs/ControlledCheckbox";

interface Props {
  values: IPlayerInput;
  onSubmit: (values: IPlayerInput) => void;
}

export default function PlayerForm({ values, onSubmit }: Props) {
  const { control, handleSubmit } = useForm({
    defaultValues: { ...values },
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextInput
        control={control}
        inputName={"name"}
        label="Name"
        defaultValue={values?.name}
      />
      <ControlledSelectInput
        control={control}
        inputName={"nationality"}
        label="Nationality"
        options={getCountryOptions()}
        defaultValue={values?.nationality}
      />
      <ControlledDateInput
        control={control}
        inputName={"dob"}
        label={"Date of Birth"}
        defaultValue={values?.dob}
      />
      <ControlledCheckbox
        control={control}
        inputName={"isActive"}
        label="Is currently active"
        defaultValue={values.isActive}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
