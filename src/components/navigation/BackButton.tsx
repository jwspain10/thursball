"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { ActionIcon } from "@mantine/core";

export function BackButton() {
  const router = useRouter();

  return (
    <ActionIcon
      variant="filled"
      radius="xl"
      aria-label="Settings"
      onClick={() => router.back()}
    >
      <FaArrowLeft style={{ width: "70%", height: "70%" }} />
    </ActionIcon>
  );
}
