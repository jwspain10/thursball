"use client";

import React from "react";
import PlayerForm from "../../../forms/player/PlayerForm";
import { createPlayer } from "@/actions/player/createPlayer";
import { IPlayer } from "@/app/types";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export default function AddPlayerPage() {
  const router = useRouter();

  const onSubmit = (data: IPlayer) => {
    createPlayer(data)
      .then(() => {
        notifications.show({
          title: "Success",
          message: "Player created successfully",
          color: "green",
        });
        router.push("/players");
      })
      .catch((error) => {
        console.error("client error", error);
        notifications.show({
          title: "Error",
          message: "Something went wrong while creating the player",
          color: "red",
        });
      });
  };

  return <PlayerForm onSubmit={onSubmit} />;
}
