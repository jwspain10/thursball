"use client";

import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { Button, Checkbox, Group, TextInput, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { getCountryOptions } from "@/utils/getCountryOptions";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { schema } from "./schema";
import { initialValues } from "./initialValues";
import { IPlayer } from "@/app/types";

interface Props {
  defaultValues?: IPlayer;
  onSubmit: (values: IPlayer) => void;
}

export default function PlayerForm({ defaultValues, onSubmit }: Props) {
  useEffect(() => {
    if (defaultValues) {
      form.setValues({
        ...defaultValues,
        dob: new Date(defaultValues.dob),
      });
      form.resetDirty({
        ...defaultValues,
        dob: new Date(defaultValues.dob),
      });
    }
  }, [defaultValues]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialValues,
    validate: zod4Resolver(schema),
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSubmit({ ...values, dob: new Date(values.dob).toISOString() })
      )}
    >
      <TextInput
        withAsterisk
        label="Name"
        placeholder="First Last"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <Select
        label="Nationality"
        placeholder="Country"
        data={getCountryOptions()}
        key={form.key("nationality")}
        {...form.getInputProps("nationality")}
      />

      <DatePickerInput
        placeholder="Pick date"
        label="Date of Birth"
        radius="md"
        withAsterisk
        key={form.key("dob")}
        {...form.getInputProps("dob")}
      />
      <Checkbox
        mt="md"
        label="Is currently active"
        key={form.key("isActive")}
        {...form.getInputProps("isActive", { type: "checkbox" })}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
