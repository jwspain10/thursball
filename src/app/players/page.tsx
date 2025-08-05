import { LinkButton } from "@/components/LinkButton";
import prisma from "../../../lib/prisma";

export default async function PlayersPage() {
  const players = await prisma.player.findMany({
    include: {},
  });
  return (
    <div>
      <LinkButton link="/players/add" label="Add Player" />
      {players.map((player) => {
        return (
          <div key={player.id}>
            {player.name}{" "}
            <LinkButton link={`/players/${player.id}`} label="View" />
          </div>
        );
      })}
    </div>
  );
}
