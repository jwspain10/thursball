import SignIn from "@/components/SignIn";
import SignOut from "@/components/SignOut";
import { auth } from "../../auth";
import { Box, Center } from "@mantine/core";

export default async function HomePage() {
  const session = await auth();

  const message = session?.user
    ? `You are currently logged in as ${session.user.name} with role ${session.user.role}`
    : "You are not currently logged in";

  return (
    <Center>
      <Box>
        {message} <Box>{session ? <SignOut /> : <SignIn />}</Box>
      </Box>
    </Center>
  );
}
