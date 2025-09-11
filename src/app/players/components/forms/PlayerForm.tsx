"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCountryOptions } from "@/utils/getCountryOptions";
import { schema } from "./schema";
import { IPlayerInput } from "@/app/types";
import ControlledTextInput from "@/components/inputs/ControlledTextInput";
import ControlledSelectInput from "@/components/inputs/ControlledSelectInput";
import ControlledDateInput from "@/components/inputs/ControlledDateInput";
import ControlledCheckbox from "@/components/inputs/ControlledCheckbox";
import FormContainer from "@/components/FormContainer";
import { Stack } from "@mantine/core";

interface Props {
  values: IPlayerInput;
  onSubmit: (values: IPlayerInput) => void;
  loading?: boolean;
}

export default function PlayerForm({ values, onSubmit, loading }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...values },
    resolver: zodResolver(schema),
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <Stack
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="flex-start"
        gap="md"
      >
        <ControlledTextInput
          control={control}
          inputName={"name"}
          label="Name"
          defaultValue={values?.name}
          errors={errors?.name}
        />
        <ControlledTextInput
          control={control}
          inputName={"lastName"}
          label="Last Name"
          defaultValue={values?.lastName}
          errors={errors?.lastName}
        />
        <ControlledSelectInput
          control={control}
          inputName={"nationality"}
          label="Nationality"
          options={getCountryOptions()}
          defaultValue={values?.nationality}
          errors={errors?.nationality}
        />
        <ControlledDateInput
          control={control}
          inputName={"dob"}
          label={"Date of Birth"}
          defaultValue={values?.dob}
          errors={errors?.dob}
        />
        <ControlledCheckbox
          control={control}
          inputName={"isActive"}
          label="Is currently active"
          defaultValue={values.isActive}
          errors={errors.isActive}
        />
      </Stack>
    </FormContainer>
  );
}
