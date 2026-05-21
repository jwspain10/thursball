"use client";

import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import MatchDetailsForm from "./Steps/MatchDetailsForm";
import { usePlayerOptions } from "../hooks/usePlayerOptions";
import MatchPlayersIdsForm from "./Steps/MatchPlayersIdsForm";
import ConfirmSubmitMatch from "./ConfirmSubmitMatch";
import { FormProvider } from "../providers/FormProvider";
import MatchPlayerStatsForm from "./Steps/MatchPlayerStats";
import CurrentMatchOverview from "./CurrentMatchOverview";
import { IMatchSubmitInput } from "../types";

interface Props {
  onSubmit: (data: IMatchSubmitInput) => void;
  initialValues?: IMatchSubmitInput;
}

export default function FormStepper({ onSubmit, initialValues }: Props) {
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const { playerOptions } = usePlayerOptions();

  const steps = [
    {
      key: 1,
      comp: (
        <MatchDetailsForm
          onNextClick={nextStep}
          playerOptions={playerOptions}
        />
      ),
    },
    {
      key: 2,
      comp: (
        <MatchPlayersIdsForm
          playerOptions={playerOptions}
          onNextClick={nextStep}
        />
      ),
    },
    {
      key: 3,
      comp: (
        <MatchPlayerStatsForm
          playerOptions={playerOptions}
          onNextClick={nextStep}
        />
      ),
    },
    { key: 4, comp: <ConfirmSubmitMatch onSubmit={onSubmit} /> },
  ];

  const initialDetails = initialValues
    ? {
        matchDate: initialValues.matchDate,
        nameTeam1: initialValues.nameTeam1,
        nameTeam2: initialValues.nameTeam2,
        scoreTeam1: initialValues.scoreTeam1,
        scoreTeam2: initialValues.scoreTeam2,
      }
    : undefined;

  const initialPlayerIds = initialValues
    ? {
        team1Players: initialValues.team1Players.map((p) => p.playerId),
        team2Players: initialValues.team2Players.map((p) => p.playerId),
      }
    : undefined;

  const initialPlayerStats = initialValues
    ? [...initialValues.team1Players, ...initialValues.team2Players]
    : undefined;

  return (
    <FormProvider
      initialDetails={initialDetails}
      initialPlayerIds={initialPlayerIds}
      initialPlayerStats={initialPlayerStats}
    >
      <>
        <Stepper active={active} size="xs" onStepClick={setActive}>
          {steps.map((step) => {
            return (
              <Stepper.Step key={step.key}>
                <CurrentMatchOverview />
                {step.comp}
              </Stepper.Step>
            );
          })}
        </Stepper>
        <Group justify="flex-start">
          <Button color="red" size="xs" radius="lg" onClick={prevStep}>
            Back
          </Button>
        </Group>
      </>
    </FormProvider>
  );
}
