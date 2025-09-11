import { useEffect, useState } from "react";

import { ISelectOptions } from "@/app/types";
import { fetchAllPlayers } from "@/app/players/api/fetchAllPlayers";

export const dynamic = "force-dynamic";

export const usePlayerOptions = () => {
  const [playerOptions, setPlayerOptions] = useState<ISelectOptions[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      console.log("GETTING PLAYERS");

      await fetchAllPlayers().then((players) => {
        const options = players.map((player) => ({
          value: player.id,
          label: player.name,
        }));
        setPlayerOptions(options);
      });
    };
    getPlayers();
  }, []);
  return { playerOptions };
};
