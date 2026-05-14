import { LinkButton } from "@/components/navigation/LinkButton";
import { getCountry } from "@/utils/getCountry";
import { Avatar, NavLink } from "@mantine/core";
import { fetchAllPlayers } from "./api";
import { getName } from "@/utils/getName";
import { auth } from "../../../auth";
import { getAuthRole } from "@/utils/getAuthRole";
import ReactCountryFlag from "react-country-flag";
import { Suspense } from "react";
import PlayersLoading from "./components/PlayersLoading";
import ListPagination from "@/components/ListPagination";

export default async function PlayersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);

  const session = await auth();
  const { isAdmin } = getAuthRole(session);
  const { players, total } = await fetchAllPlayers({ page: currentPage });

  const renderFlag = (countryCode: string) => (
    <>
      <ReactCountryFlag
        svg
        style={{ fontSize: "1rem", marginRight: "0.5rem" }}
        countryCode={countryCode}
      />
      {getCountry(countryCode)}
    </>
  );

  return (
    <>
      <div>
        {isAdmin && <LinkButton link="/players/add" label="Add Player" />}
        <ListPagination total={total} pageSize={10} currentPage={currentPage} />

        <Suspense fallback={<PlayersLoading />}>
          {players.map((player) => {
            const { nameAndInitial, initials } = getName(
              player.name,
              player.lastName || "",
            );

            return (
              <NavLink
                key={player.id}
                href={`/players/${player.id}`}
                label={nameAndInitial}
                description={renderFlag(player.nationality)}
                leftSection={
                  <Avatar variant="filled" radius="xl" src="">
                    {initials}
                  </Avatar>
                }
              />
            );
          })}
        </Suspense>
      </div>
    </>
  );
}
