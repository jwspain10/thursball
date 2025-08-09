import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import React from "react";

interface Props {
  title?: string;
  button?: React.ReactNode;
  children?: React.ReactNode;
}

export default function CustomModal({ title, button, children }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        {children}
      </Modal>

      <span onClick={open}>{button}</span>
    </>
  );
}
