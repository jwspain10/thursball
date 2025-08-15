"use client";

import React, { useEffect, useState } from "react";
import PlayerForm from "../../../forms/player/PlayerForm";
import { createPlayer } from "@/actions/player/createPlayer";
import { IPlayerInput } from "@/app/types";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { initialValues } from "@/forms/player/initialValues";

export default function AddPlayerPage() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<IPlayerInput | null>(null);
  const router = useRouter();

  useEffect(() => {
    setValues({ ...initialValues });
  }, []);

  const onSubmit = (data: IPlayerInput) => {
    setLoading(true);
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
        setLoading(false);
        notifications.show({
          title: "Error",
          message: "Something went wrong while creating the player",
          color: "red",
        });
      });
  };

  return !loading && values ? (
    <PlayerForm onSubmit={onSubmit} values={values} />
  ) : (
    <div>LoadinG!!!</div>
  );
}
