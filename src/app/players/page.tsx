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

export default async function PlayersPage() {
  const session = await auth();
  const { isAdmin } = getAuthRole(session);
  const players = await fetchAllPlayers();

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

        <Suspense fallback={<PlayersLoading />}>
          {players.map((player) => {
            const { nameAndInitial, initials } = getName(
              player.name,
              player.lastName || ""
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
