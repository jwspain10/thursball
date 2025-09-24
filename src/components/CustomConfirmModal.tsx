import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  label: string;
  title: string;
}

export default function CustomConfirmModal({
  children,

  label,
  title,
}: Props) {
  const openModal = () =>
    modals.open({
      title: title,
      children: children,
    });

  return <Button onClick={openModal}>{label}</Button>;
}
