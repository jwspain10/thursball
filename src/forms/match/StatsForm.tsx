"use client";

import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { Button, Group } from "@mantine/core";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { IStatsInput } from "@/app/types";
import { initialStatsValues } from "./initialValues";
import { schema } from "./schema";

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
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
