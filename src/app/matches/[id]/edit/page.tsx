"use client";

import { IMatch } from "@/app/types";
import CustomModal from "@/components/CustomModal";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deleteMatch } from "@/actions/match/deleteMatch";
import { notifications } from "@mantine/notifications";
import { fetchMatch } from "@/actions/match/fetchMatch";
import { SubHeader } from "@/components/SubHeader";

export default function EditMatchPage() {
  const [match, setMatch] = useState<IMatch | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    fetchMatch(id)
      .then((data) => {
        setMatch(data);
      })
      .catch((error) => {
        console.error("Error fetching player:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const onDelete = async () => {
    setLoading(true);
    await deleteMatch(id)
      .then(() => {
        notifications.show({
          title: "Success",
          message: "Match deleted successfully",
          color: "green",
        });

        router.push("/matches");
      })
      .catch((error) => {
        console.error("client error", error);
        setLoading(false);
        notifications.show({
          title: "Error",
          message: `Something went wrong while updating the match: ${error.message}`,
          color: "red",
        });
      });
  };

  return (
    <div>
      <SubHeader goBack>Edit Match</SubHeader>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <CustomModal
          title="Delete Match"
          button={<Button color="red">Delete Match</Button>}
        >
          Are you sure you want to delete this match?
          <Button color="red" onClick={onDelete}>
            Delete
          </Button>
        </CustomModal>
      )}
    </div>
  );
}
