import { LinkButton } from "@/components/LinkButton";
import prisma from "../../../lib/prisma";
import { getAge } from "@/utils/getAge";
import { getCountry } from "@/utils/getCountry";

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
          <div key={player.id}>
            {player.name} {getCountry(player.nationality)} {getAge(birthday)}{" "}
            <LinkButton link={`/players/${player.id}`} label="View" />
          </div>
        );
      })}
    </div>
  );
}
