import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";
import { auth } from "../../auth";
import { Box, Center, Stack, Title, Text } from "@mantine/core";

export default async function HomePage() {
  const session = await auth();

  const message = session?.user ? `Logged in as ${session.user.name}` : "";

  return (
    <Center maw={400}>
      <Stack align="center" gap="xs">
        <Title>Thursball</Title>
        <Box ta="center">
          <Text>{message}</Text>
          {session ? <SignOut /> : <SignIn />}
        </Box>
      </Stack>
    </Center>
  );
}
