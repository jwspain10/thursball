import { Flex, Skeleton, Stack } from "@mantine/core";

export default async function PlayersLoading() {
  const playerSkeletons = Array.from({ length: 10 });
  return (
    <>
      <Stack ml={12} gap={"md"}>
        {playerSkeletons.map((_, i) => (
          <Flex
            key={i}
            gap="sm"
            justify="flex-start"
            align="center"
            direction="row"
          >
            <Skeleton height={38} circle />
            <Skeleton height={38} width={150} radius="sm" />
          </Flex>
        ))}
      </Stack>
    </>
  );
}
