"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import MatchForm from "@/forms/match/MatchForm";
import { createMatch } from "@/actions/match/createMatch";
import { IMatchInput, ISelectOptions } from "@/app/types";
import { fetchAllPlayers } from "@/actions/player/fetchAllPlayers";

export default function AddMatchPage() {
  const [loading, setLoading] = useState(false);
  const [playerOptions, setPlayerOptions] = useState<ISelectOptions[]>([]);
  const router = useRouter();

  const onSubmit = (data: IMatchInput) => {
    console.log("Submitting match data:", data);
    setLoading(true);
    createMatch(data)
      .then(() => {
        notifications.show({
          title: "Success",
          message: "Match created successfully",
          color: "green",
        });
        router.push("/matches");
      })
      .catch((error) => {
        console.error("client error", error);
        setLoading(false);
        notifications.show({
          title: "Error",
          message: "Something went wrong while creating the match",
          color: "red",
        });
      });
  };

  useEffect(() => {
    const getPlayers = async () => {
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

  return !loading ? (
    <MatchForm onSubmit={onSubmit} playerOptions={playerOptions || []} />
  ) : (
    <div>Loading...</div>
  );
}
