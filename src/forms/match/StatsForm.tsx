"use client";

import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { Button, Checkbox, Group } from "@mantine/core";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { IStatsInput } from "@/app/types";
import { initialStatsValues } from "./initialValues";
import { schema } from "./schema";
import CustomNumberInput from "@/components/CustomNumberInput";

interface Props {
  defaultValues?: IStatsInput;
  onSubmit: (values: IStatsInput) => void;
}

export default function StatsForm({ defaultValues, onSubmit }: Props) {
  useEffect(() => {
    if (defaultValues) {
      form.setValues({
        ...defaultValues,
      });
      form.resetDirty({
        ...defaultValues,
        playerId: "",
      });
    }
  }, [defaultValues]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialStatsValues,
    validate: zod4Resolver(schema),
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit({ ...values }))}>
      <CustomNumberInput
        label="Goals"
        placeholder="Goals"
        key={form.key("goals")}
        {...form.getInputProps("goals")}
      />
      <CustomNumberInput
        label="Assists"
        placeholder="Assists"
        key={form.key("assists")}
        {...form.getInputProps("assists")}
      />
      <CustomNumberInput
        label="Conceded"
        placeholder="Conceded"
        key={form.key("conceded")}
        {...form.getInputProps("conceded")}
      />

      <Checkbox
        mt="md"
        label="MVP?"
        key={form.key("mvp")}
        {...form.getInputProps("mvp", { type: "checkbox" })}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
