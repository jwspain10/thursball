import { useEffect, useState } from "react";

import { ISelectOptions } from "@/app/types";
import { fetchPlayerOptions } from "@/app/players/api/fetchPlayerOptions";
import { getName } from "@/utils/getName";

export const dynamic = "force-dynamic";

export const usePlayerOptions = () => {
  const [playerOptions, setPlayerOptions] = useState<ISelectOptions[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      await fetchPlayerOptions().then((players) => {
        const options = players
          .map((player) => ({
            value: player.id,
            label: getName(player.name, player.lastName || "").nameAndInitial,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setPlayerOptions(options);
      });
    };
    getPlayers();
  }, []);
  return { playerOptions };
};
