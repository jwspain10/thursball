"use client";

import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { Button, Checkbox, Group, TextInput, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { getCountryOptions } from "@/utils/getCountryOptions";

interface Props {
  defaultValues?: {
    name: string;
    dob: Date | string;
    nationality: string;
    isActive: boolean;
  } | null;
}

export default function PlayerForm({ defaultValues }: Props) {
  useEffect(() => {
    if (defaultValues) {
      const dob =
        typeof defaultValues.dob === "string"
          ? new Date(defaultValues.dob)
          : defaultValues.dob;
      form.setValues({ ...defaultValues, dob });
      form.resetDirty({ ...defaultValues, dob });
    }
  }, [defaultValues]);

  const form = useForm({
    mode: "uncontrolled",
    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
