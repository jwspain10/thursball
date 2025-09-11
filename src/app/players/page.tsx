import { LinkButton } from "@/components/LinkButton";
import { getAge } from "@/utils/getAge";
import { getCountry } from "@/utils/getCountry";
import { Avatar, NavLink } from "@mantine/core";
import { fetchAllPlayers } from "./api";
import { getName } from "@/utils/getName";
import PlayerFormLoading from "./components/forms/PlayerFormLoading";
import PlayersLoading from "./loading";

// export const dynamic = "force-dynamic";

export default async function PlayersPage() {
  const players = await fetchAllPlayers();

  return (
    <>
      <div>
        <LinkButton link="/players/add" label="Add Player" />
        {players.map((player) => {
          const { nameAndInitial, initials } = getName(
            player.name,
            player.lastName || ""
          );
          const birthday = new Date(player.dob);
          return (
            <NavLink
              key={player.id}
              href={`/players/${player.id}`}
              label={nameAndInitial}
              description={`${getAge(birthday)}, ${getCountry(
                player.nationality
              )}`}
              leftSection={
                <Avatar variant="filled" radius="xl" src="">
                  {initials}
                </Avatar>
              }
            />
          );
        })}
      </div>
    </>
  );
}
