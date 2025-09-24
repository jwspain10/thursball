"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { ActionIcon } from "@mantine/core";

export function BackButton() {
  const router = useRouter();

  return (
    <ActionIcon
      variant="light"
      color="gray"
      radius="xl"
      aria-label="Settings"
      onClick={() => router.back()}
    >
      <FaArrowLeft />
    </ActionIcon>
  );
}
