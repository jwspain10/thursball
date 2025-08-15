"use client";

import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { Button, Group, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { IMatchInput, ISelectOptions } from "@/app/types";
import { initialMatchValues } from "./initialValues";
import { schema } from "./schema";
import CustomNumberInput from "@/components/CustomNumberInput";

interface Props {
  defaultValues?: IMatchInput;
  playerOptions: ISelectOptions[];
  onSubmit: (values: IMatchInput) => void;
}

export default function PlayerForm({
  defaultValues,
  playerOptions,
  onSubmit,
}: Props) {
  const setDateToString = (date: Date | null): string => {
    return date ? date.toISOString() : "";
  };
  useEffect(() => {
    if (defaultValues) {
      form.setValues({
        ...defaultValues,
        matchDate: setDateToString(defaultValues.matchDate),
      });
      form.resetDirty({
        ...defaultValues,
        matchDate: setDateToString(defaultValues.matchDate),
      });
    }
  }, [defaultValues]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: initialMatchValues,
    validate: zod4Resolver(schema),
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSubmit({ ...values, matchDate: new Date(values.matchDate) })
      )}
    >
      <DatePickerInput
        placeholder="Pick date"
        label="Match Date"
        radius="md"
        withAsterisk
        key={form.key("matchDate")}
        {...form.getInputProps("matchDate")}
      />
      <TextInput
        withAsterisk
        label="Team 1 Name"
        placeholder="Team 1"
        key={form.key("team1Name")}
        {...form.getInputProps("team1Name")}
      />
      <TextInput
        withAsterisk
        label="Team 2 Name"
        placeholder="Team 2"
        key={form.key("team2Name")}
        {...form.getInputProps("team2Name")}
      />
      <CustomNumberInput
        label="Team 1 Score"
        placeholder="Score"
        key={form.key("team1Score")}
        {...form.getInputProps("team1score")}
      />
      <CustomNumberInput
        label="Team 2 Score"
        placeholder="Score"
        key={form.key("team2Score")}
        {...form.getInputProps("team2score")}
      />
      <Select
        label="Team 1 Players"
        placeholder="Team 1 Players"
        data={playerOptions}
        key={form.key("team1Players")}
        {...form.getInputProps("team1Players")}
      />
      <Select
        label="Team 2 Players"
        placeholder="Team 2 Players"
        data={playerOptions}
        key={form.key("team2Players")}
        {...form.getInputProps("team2Players")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
