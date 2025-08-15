"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group } from "@mantine/core";
import { IMatchInput, ISelectOptions } from "@/app/types";
import { schema } from "./schema";
import ControlledTextInput from "@/components/inputs/ControlledTextInput";
import ControlledNumberInput from "@/components/inputs/ControlledNumberInput";
import ControlledDateInput from "@/components/inputs/ControlledDateInput";
import FormContainer from "@/components/FormContainer";
// import ControlledMultiSelectInput from "@/components/inputs/ControlledMultiSelectInput";

interface Props {
  values: IMatchInput;
  playerOptions: ISelectOptions[];
  onSubmit: (values: IMatchInput) => void;
}

export default function PlayerForm({ values, playerOptions, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...values },
    resolver: zodResolver(schema),
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <>
        <ControlledDateInput
          control={control}
          inputName={"matchDate"}
          label="Match Date"
          defaultValue={values?.matchDate}
          errors={errors?.matchDate}
        />
        <ControlledTextInput
          control={control}
          inputName={"team1Name"}
          label="Team 1"
          defaultValue={values?.team1Name}
          errors={errors.team1Name}
        />
        <ControlledTextInput
          control={control}
          inputName={"team2Name"}
          label="Team 2"
          defaultValue={values?.team2Name}
          errors={errors.team2Name}
        />
        <ControlledNumberInput
          control={control}
          inputName={"team1Score"}
          label="Team 1 Score"
          defaultValue={values?.team1Score}
          errors={errors?.team1Score}
        />
        <ControlledNumberInput
          control={control}
          inputName={"team2Score"}
          label="Team 2 Score"
          defaultValue={values?.team2Score}
          errors={errors?.team2Score}
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
      </>
    </FormContainer>
  );
}
