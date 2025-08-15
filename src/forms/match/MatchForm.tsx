"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group } from "@mantine/core";
import { IMatchInput, ISelectOptions } from "@/app/types";
import { schema } from "./schema";
import ControlledTextInput from "@/components/inputs/ControlledTextInput";
import ControlledNumberInput from "@/components/inputs/ControlledNumberInput";
import ControlledDateInput from "@/components/inputs/ControlledDateInput";
// import ControlledMultiSelectInput from "@/components/inputs/ControlledMultiSelectInput";

interface Props {
  values: IMatchInput;
  playerOptions: ISelectOptions[];
  onSubmit: (values: IMatchInput) => void;
}

export default function PlayerForm({ values, playerOptions, onSubmit }: Props) {
  const { control, handleSubmit } = useForm({
    defaultValues: { ...values },
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledDateInput
        control={control}
        inputName={"matchDate"}
        label="Match Date"
        defaultValue={values?.matchDate.toString()}
      />
      <ControlledTextInput
        control={control}
        inputName={"team1Name"}
        label="Team 1"
        defaultValue={values?.team1Name}
      />
      <ControlledTextInput
        control={control}
        inputName={"team2Name"}
        label="Team 2"
        defaultValue={values?.team2Name}
      />
      <ControlledNumberInput
        control={control}
        inputName={"team1Score"}
        label="Team 1 Score"
        defaultValue={values?.team1Score}
      />
      <ControlledNumberInput
        control={control}
        inputName={"team2Score"}
        label="Team 2 Score"
        defaultValue={values?.team2Score}
      />
      {/* <ControlledMultiSelectInput
        control={control}
        inputName={"team1Players"}
        label="Team 1 Players"
        options={playerOptions}
      />
      <ControlledMultiSelectInput
        control={control}
        inputName={"team2Players"}
        label="Team 2 Players"
        options={playerOptions}
      /> */}

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
