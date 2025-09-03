"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { statsSchema } from "../schema";
import ControlledNumberInput from "@/components/inputs/ControlledNumberInput";
import FormContainer from "@/components/FormContainer";
import { IMatchPlayerStatsInput } from "../types";

interface Props {
  values: IMatchPlayerStatsInput;
  onSubmit: (values: IMatchPlayerStatsInput) => void;
}

export default function StatsForm({ values, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...values, player: { name: values.player.name } },
    resolver: zodResolver(statsSchema),
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <>
        <ControlledNumberInput
          control={control}
          inputName={"goals"}
          label="Goals"
          defaultValue={values?.goals}
          errors={errors?.goals}
        />
        <ControlledNumberInput
          control={control}
          inputName={"assists"}
          label="Assists"
          defaultValue={values?.assists}
          errors={errors?.assists}
        />
        <ControlledNumberInput
          control={control}
          inputName={"conceded"}
          label="Conceded"
          defaultValue={values?.conceded}
          errors={errors?.conceded}
        />
        <ControlledNumberInput
          control={control}
          inputName={"mvp"}
          label="MVP"
          defaultValue={values?.mvp}
          errors={errors?.mvp}
        />
      </>
    </FormContainer>
  );
}
