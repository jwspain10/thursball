"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import CustomModal from "@/components/CustomModal";
import { SubHeader } from "@/components/navigation/SubHeader";
import { fetchMatch, deleteMatch, updateMatch } from "../../api";
import { mapMatchResponseToSubmitInput } from "../../schema";
import { IMatchSubmitInput } from "../../types";
import CustomLoader from "@/components/CustomLoader";
import FormStepper from "../../components/FormStepper";

export default function EditMatchPage() {
  const [initialValues, setInitialValues] = useState<IMatchSubmitInput | null>(
    null,
  );
  const [team1Id, setTeam1Id] = useState("");
  const [team2Id, setTeam2Id] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    fetchMatch(id)
      .then((data) => {
        if (data) {
          setInitialValues(mapMatchResponseToSubmitInput(data));
          setTeam1Id(data.team1Id);
          setTeam2Id(data.team2Id);
        }
      })
      .catch((error) => {
        console.error("Error fetching match:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const onSubmit = (data: IMatchSubmitInput) => {
    setLoading(true);
    updateMatch({ id, team1Id, team2Id, data })
      .then(() => {
        notifications.show({
          title: "Success",
          message: "Match updated successfully",
          color: "green",
        });
        router.push("/matches");
      })
      .catch((error) => {
        console.error("client error", error);
        setLoading(false);
        notifications.show({
          title: "Error",
          message: "Something went wrong while updating the match",
          color: "red",
        });
      });
  };

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
        let errorMessage = error.message;
        if (errorMessage.includes("Foreign key constraint")) {
          errorMessage = "Can not delete a match with match players associated";
        }
        setLoading(false);
        notifications.show({
          title: "Error",
          message: `Something went wrong while updating the match: ${errorMessage}`,
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
            title="Delete Match"
            button={<Button color="red">Delete Match</Button>}
          >
            Are you sure you want to delete this match?
            <Button color="red" onClick={onDelete}>
              Delete
            </Button>
          </CustomModal>
        }
      >
        Edit Match
      </SubHeader>
      {!loading && initialValues ? (
        <FormStepper onSubmit={onSubmit} initialValues={initialValues} />
      ) : (
        <CustomLoader label="Loading match..." />
      )}
    </>
  );
}
