"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "@/components/FormContainer";
import ControlledMultiSelectInput from "@/components/inputs/ControlledMultiSelectInput";
import { ISelectOptions } from "@/app/types";
import { matchPlayersSchema } from "../../schema";
import { useFormContext } from "../../providers/FormProvider";

interface Props {
  playerOptions: ISelectOptions[];
  onNextClick: () => void;
}

export default function MatchPlayersForm({
  playerOptions,
  onNextClick,
}: Props) {
  const { matchPlayerIds, setMatchPlayerIds } = useFormContext() || {};

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: matchPlayerIds,
    resolver: zodResolver(matchPlayersSchema),
  });

  const onSubmit = () => {
    if (setMatchPlayerIds) {
      setMatchPlayerIds(watch());
      onNextClick();
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <>
        <div>Team 1</div>
        <ControlledMultiSelectInput
          control={control}
          inputName={"team1Players"}
          label="Players"
          options={playerOptions}
          defaultValue={matchPlayerIds?.team1Players}
          errors={
            Array.isArray(errors?.team1Players)
              ? errors?.team1Players[0]
              : errors?.team1Players
          }
        />
        <div>Team 2</div>
        <ControlledMultiSelectInput
          control={control}
          inputName={"team2Players"}
          label="Players"
          options={playerOptions}
          defaultValue={matchPlayerIds?.team2Players}
          errors={
            Array.isArray(errors?.team2Players)
              ? errors?.team2Players[0]
              : errors?.team2Players
          }
        />
      </>
    </FormContainer>
  );
}
