"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextInput from "@/components/inputs/ControlledTextInput";
import ControlledNumberInput from "@/components/inputs/ControlledNumberInput";
import ControlledDateInput from "@/components/inputs/ControlledDateInput";
import FormContainer from "@/components/FormContainer";
import { schema } from "../../schema";
import { useFormContext } from "../../providers/FormProvider";

interface Props {
  onNextClick: () => void;
}

export default function MatchDetailsForm({ onNextClick }: Props) {
  const { matchDetails, setMatchDetails } = useFormContext() || {};

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { ...matchDetails },
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    onNextClick();
    const watched = watch();
    if (setMatchDetails) {
      setMatchDetails({
        ...watched,
        matchDate: watched.matchDate || new Date(),
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <>
        <ControlledDateInput
          control={control}
          inputName={"matchDate"}
          label="Match Date"
          defaultValue={matchDetails?.matchDate}
          errors={errors?.matchDate}
        />
        <ControlledTextInput
          control={control}
          inputName={"nameTeam1"}
          label="Team 1"
          defaultValue={matchDetails?.nameTeam1}
          errors={errors.nameTeam1}
        />
        <ControlledTextInput
          control={control}
          inputName={"nameTeam2"}
          label="Team 2"
          defaultValue={matchDetails?.nameTeam2}
          errors={errors.nameTeam2}
        />
        <ControlledNumberInput
          control={control}
          inputName={"scoreTeam1"}
          label="Team 1 Score"
          defaultValue={matchDetails?.scoreTeam1}
          errors={errors?.scoreTeam1}
        />
        <ControlledNumberInput
          control={control}
          inputName={"scoreTeam2"}
          label="Team 2 Score"
          defaultValue={matchDetails?.scoreTeam2}
          errors={errors?.scoreTeam2}
        />
      </>
    </FormContainer>
  );
}
