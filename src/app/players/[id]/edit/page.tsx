"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IPlayer, IPlayerInput } from "@/app/types";
import { SubHeader } from "@/components/navigation/SubHeader";
import CustomModal from "@/components/CustomModal";
import { fetchPlayer, updatePlayer, deletePlayer } from "../../api";
import { initialValues } from "../../components/forms/initialValues";
import PlayerForm from "../../components/forms/PlayerForm";
import PlayerFormLoading from "../../components/forms/PlayerFormLoading";

export default function EditPlayerPage() {
  const [values, setValues] = useState<IPlayerInput | null>(null);
  const [loadingForm, setLoadingForm] = useState(true);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    fetchPlayer(id)
      .then((data) => {
        setLoadingForm(false);
        if (data) {
          setValues({ ...data, lastName: data.lastName || "" });
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
  }, [id]);

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
      <SubHeader
        goBack
        button={
          <CustomModal
            title="Delete Player"
            button={<Button color="red">Delete Player</Button>}
          >
            Are you sure you want to delete this player?
            <Button color="red" onClick={onDelete}>
              Delete
            </Button>
          </CustomModal>
        }
      >
        Edit Player
      </SubHeader>
      {loadingForm && <PlayerFormLoading />}
      {values && (
        <PlayerForm values={values} onSubmit={onSubmit} loading={loading} />
      )}
    </>
  );
}
