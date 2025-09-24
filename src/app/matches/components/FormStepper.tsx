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
}

export default function FormStepper({ onSubmit }: Props) {
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const { playerOptions } = usePlayerOptions();

  const steps = [
    { key: 1, comp: <MatchDetailsForm onNextClick={nextStep} /> },
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

  return (
    <FormProvider>
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
          <Button variant="subtle" color="pink" onClick={prevStep}>
            Back
          </Button>
        </Group>
      </>
    </FormProvider>
  );
}
