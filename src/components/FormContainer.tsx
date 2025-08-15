import { FormEvent } from "react";
import { Box, Button, Container, Group } from "@mantine/core";

interface Props {
  children: React.ReactElement;
  onSubmit: (formData: FormEvent) => void;
}

export default function FormContainer({ children, onSubmit }: Props) {
  return (
    <Container strategy="grid" size={500}>
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
