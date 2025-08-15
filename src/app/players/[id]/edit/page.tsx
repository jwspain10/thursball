"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IPlayer, IPlayerInput } from "@/app/types";
import { fetchPlayer } from "@/actions/player/fetchPlayer";
import { updatePlayer } from "@/actions/player/updatePlayer";
import { deletePlayer } from "@/actions/player/deletePlayer";
import { SubHeader } from "@/components/SubHeader";
import CustomModal from "@/components/CustomModal";
import PlayerForm from "../../../../forms/player/PlayerForm";
import { initialValues } from "@/forms/player/initialValues";

export default function EditPlayerPage() {
  const [values, setValues] = useState<IPlayerInput | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    fetchPlayer(id)
      .then((data) => {
        if (data) {
          setValues({ ...data });
        } else {
          setValues({ ...initialValues });
        }
      })
      .catch((error) => {
        console.error("Error fetching player:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSubmit = async (data: IPlayer) => {
    setLoading(true);
    await updatePlayer(id, data)
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
        setLoading(false);
        notifications.show({
          title: "Error",
          message: `Something went wrong while updating the player: ${error.message}`,
          color: "red",
        });
      });
  };

  const onDelete = async () => {
    setLoading(true);
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
        setLoading(false);
        notifications.show({
          title: "Oops",
          message: `Something went wrong while updating the player: ${error.message}`,
          color: "red",
        });
      });
  };

  return (
    <>
      <SubHeader goBack>Edit Player</SubHeader>
      {!loading && values ? (
        <div>
          <PlayerForm values={values} onSubmit={onSubmit} />
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
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
