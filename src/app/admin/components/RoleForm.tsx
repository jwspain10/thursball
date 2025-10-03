"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../schema";
import FormContainer from "@/components/FormContainer";
import CustomConfirmModal from "@/components/CustomConfirmModal";
import { IRole } from "../types";
import ControlledSelectInput from "@/components/inputs/ControlledSelectInput";
import { ISelectOptions } from "@/app/types";
import { Role } from "@prisma/client";

interface Props {
  userId: string;
  values: IRole;
  roleOptions: ISelectOptions[];
  onSubmit: (id: string, values: { role: Role }) => void;
}

export default function RoleForm({
  values,
  onSubmit,
  roleOptions,
  userId,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...values },
    resolver: zodResolver(schema),
  });

  return (
    <CustomConfirmModal label={values.role} title="Change Role">
      <FormContainer
        onSubmit={handleSubmit((values) =>
          onSubmit(userId, values as { role: Role })
        )}
      >
        <>
          <ControlledSelectInput
            control={control}
            inputName={"role"}
            label="Role"
            options={roleOptions}
            defaultValue={values?.role}
            errors={errors?.role}
          />
        </>
      </FormContainer>
    </CustomConfirmModal>
  );
}
