import { FormEvent } from "react";
import { Box, Button, Container, Group, LoadingOverlay } from "@mantine/core";

interface Props {
  children: React.ReactElement;
  onSubmit: (formData: FormEvent) => void;
  loading?: boolean;
}

export default function FormContainer({ children, onSubmit, loading }: Props) {
  return (
    <Container strategy="grid">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          onSubmit(ev);
        }}
      >
        <Box>{children}</Box>
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Container>
  );
}
