import { Box, Text } from "@mantine/core";

export default async function AuthError() {
  return (
    <Box>
      <Text>
        You do not have the admin permissions necessary to access that page
      </Text>
    </Box>
  );
}
