"use client";

import { useState, useEffect } from "react";
import { IPlayer } from "@/app/types";
import { useParams, useRouter } from "next/navigation";
import PlayerForm from "../../../../forms/player/PlayerForm";
import { SubHeader } from "@/components/SubHeader";
import { Button } from "@mantine/core";
import { fetchPlayer } from "@/actions/player/fetchPlayer";
import { updatePlayer } from "@/actions/player/updatePlayer";
import { deletePlayer } from "@/actions/player/deletePlayer";
import CustomModal from "@/components/CustomModal";
import { notifications } from "@mantine/notifications";

export default function EditPlayerPage() {
  const [player, setPlayer] = useState<IPlayer | null>(null);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    fetchPlayer(id)
      .then((data) => {
        setPlayer(data);
      })
      .catch((error) => {
        console.error("Error fetching player:", error);
      });
  }, [id]);

  const defaultValues = {
    name: player?.name ?? "",
    dob: player?.dob ?? "",
    nationality: player?.nationality ?? "",
    isActive: player?.isActive ?? false,
  };

  const onSubmit = (data: IPlayer) => {
    updatePlayer(id, data)
      .then(() => {
        notifications.show({
          title: "Success",
          message: "Player updated successfully",
          color: "green",
        });
        router.push("/players");
      })
      .catch((error) => {
        console.error("client error", error);
        notifications.show({
          title: "Error",
          message: `Something went wrong while updating the player: ${error.message}`,
          color: "red",
        });
      });
  };

  const onDelete = async () => {
    await deletePlayer(id)
      .then(() => {
        notifications.show({
          title: "Success",
          message: "Player deleted successfully",
          color: "green",
        });
        router.push("/players");
      })
      .catch((error) => {
        console.error("client error", error);
        notifications.show({
          title: "Oops",
          message: `Something went wrong while updating the player: ${error.message}`,
          color: "red",
        });
      });
  };

  return (
    <div>
      <SubHeader goBack>Edit Player</SubHeader>
      <PlayerForm defaultValues={defaultValues} onSubmit={onSubmit} />
      <CustomModal
        title="Delete Player"
        button={<Button color="red">Delete Player</Button>}
      >
        Are you sure you want to delete this player?
        <Button color="red" onClick={onDelete}>
          Delete
        </Button>
      </CustomModal>
    </div>
  );
}
