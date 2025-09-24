"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { statsSchema } from "../schema";
import ControlledNumberInput from "@/components/inputs/ControlledNumberInput";
import FormContainer from "@/components/FormContainer";
import { IMatchPlayerStatsInput } from "../types";
import CustomConfirmModal from "@/components/CustomConfirmModal";

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
    <CustomConfirmModal label="Stats" title={values.player.name}>
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
            max={1}
            inputName={"mvp"}
            label="MVP"
            defaultValue={values?.mvp}
            errors={errors?.mvp}
          />
        </>
      </FormContainer>
    </CustomConfirmModal>
  );
}
