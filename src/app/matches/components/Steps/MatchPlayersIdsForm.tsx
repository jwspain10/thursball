"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormContainer from "@/components/FormContainer";
import ControlledMultiSelectInput from "@/components/inputs/ControlledMultiSelectInput";
import { ISelectOptions } from "@/app/types";
import { matchPlayersSchema } from "../../schema";
import { useFormContext } from "../../providers/FormProvider";
import BoxContainer from "@/components/BoxContainer";

interface Props {
  playerOptions: ISelectOptions[];
  onNextClick: () => void;
}

export default function MatchPlayersForm({
  playerOptions,
  onNextClick,
}: Props) {
  const { matchPlayerIds, setMatchPlayerIds, matchDetails } =
    useFormContext() || {};

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: matchPlayerIds,
    resolver: zodResolver(matchPlayersSchema),
  });

  const { team1Players, team2Players } = watch();

  const currentTeam1PlayerOptions = playerOptions.filter((player) => {
    return !team2Players.includes(player.value);
  });
  const currentTeam2PlayerOptions = playerOptions.filter((player) => {
    return !team1Players.includes(player.value);
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
        <BoxContainer title={matchDetails?.nameTeam1}>
          <ControlledMultiSelectInput
            control={control}
            inputName={"team1Players"}
            label="Players"
            options={currentTeam1PlayerOptions}
            defaultValue={matchPlayerIds?.team1Players}
            errors={
              Array.isArray(errors?.team1Players)
                ? errors?.team1Players[0]
                : errors?.team1Players
            }
          />
        </BoxContainer>
        <BoxContainer title={matchDetails?.nameTeam2}>
          <ControlledMultiSelectInput
            control={control}
            inputName={"team2Players"}
            label="Players"
            options={currentTeam2PlayerOptions}
            defaultValue={matchPlayerIds?.team2Players}
            errors={
              Array.isArray(errors?.team2Players)
                ? errors?.team2Players[0]
                : errors?.team2Players
            }
          />
        </BoxContainer>
      </>
    </FormContainer>
  );
}
