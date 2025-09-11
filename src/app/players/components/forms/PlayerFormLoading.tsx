"use client";

import FormContainer from "@/components/FormContainer";
import { Skeleton, Stack } from "@mantine/core";

export default function PlayerFormLoading() {
  return (
    <FormContainer onSubmit={() => null} loading={true}>
      <Stack
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="flex-start"
        gap="md"
      >
        <Skeleton height={58} radius="sm" />
        <Skeleton height={58} radius="sm" />
        <Skeleton height={58} radius="sm" />
        <Skeleton height={58} radius="sm" />
        <Skeleton height={24} radius="sm" />
      </Stack>
    </FormContainer>
  );
}
