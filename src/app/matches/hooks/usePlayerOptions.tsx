import { useEffect, useState } from "react";

import { ISelectOptions } from "@/app/types";
import { fetchAllPlayers } from "@/app/players/api/fetchAllPlayers";
import { getName } from "@/utils/getName";

export const dynamic = "force-dynamic";

export const usePlayerOptions = () => {
  const [playerOptions, setPlayerOptions] = useState<ISelectOptions[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      await fetchAllPlayers().then((players) => {
        const options = players.map((player) => ({
          value: player.id,
          label: getName(player.name, player.lastName || "").nameAndInitial,
        }));
        setPlayerOptions(options);
      });
    };
    getPlayers();
  }, []);
  return { playerOptions };
};
