import { LinkButton } from "@/components/LinkButton";
import prisma from "../../../lib/prisma";
import { getAge } from "@/utils/getAge";
import { getCountry } from "@/utils/getCountry";
import { Avatar, NavLink } from "@mantine/core";

export default async function PlayersPage() {
  const players = await prisma.player.findMany({
    include: {},
  });

  return (
    <div>
      <LinkButton link="/players/add" label="Add Player" />
      {players.map((player) => {
        const birthday = new Date(player.dob);
        return (
          <NavLink
            key={player.id}
            href={`/players/${player.id}`}
            label={player.name}
            description={`${getAge(birthday)}, ${getCountry(
              player.nationality
            )}`}
            leftSection={
              <Avatar variant="filled" radius="xl" src="">
                {player.name.at(0)}
              </Avatar>
            }
          />
        );
      })}
    </div>
  );
}
