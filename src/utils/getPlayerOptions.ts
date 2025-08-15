import { Player } from "@prisma/client";

export const getPlayerOptions = (players: Player[]) => {
  const selectOptions = players.map((player) => ({
    value: player.id,
    label: player.name,
  }));

  return selectOptions;
};
