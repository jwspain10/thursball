import { LinkButton } from "@/components/LinkButton";
import { Flex, Skeleton, Stack } from "@mantine/core";

export default async function PlayersLoading() {
  return (
    <>
      <LinkButton link="/players/add" label="Add Player" />

      <Stack ml={12} gap={"md"}>
        <Flex gap="sm" justify="flex-start" align="center" direction="row">
          <Skeleton height={38} circle />
          <Skeleton height={38} width={150} radius="sm" />
        </Flex>
        <Flex gap="sm" justify="flex-start" align="center" direction="row">
          <Skeleton height={38} circle />
          <Skeleton height={38} width={150} radius="sm" />
        </Flex>
        <Flex gap="sm" justify="flex-start" align="center" direction="row">
          <Skeleton height={38} circle />
          <Skeleton height={38} width={150} radius="sm" />
        </Flex>
        <Flex gap="sm" justify="flex-start" align="center" direction="row">
          <Skeleton height={38} circle />
          <Skeleton height={38} width={150} radius="sm" />
        </Flex>
        <Flex gap="sm" justify="flex-start" align="center" direction="row">
          <Skeleton height={38} circle />
          <Skeleton height={38} width={150} radius="sm" />
        </Flex>
      </Stack>
    </>
  );
}
