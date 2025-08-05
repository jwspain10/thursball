import prisma from "../../../lib/prisma";

export default async function PlayersPage() {
  const players = await prisma.player.findMany({
    include: {},
  });
  return (
    <div>
      {players.map((player) => {
        return <div key={player.id}>{player.name}</div>;
      })}
    </div>
  );
}
