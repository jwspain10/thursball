"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import CustomModal from "@/components/CustomModal";
import { SubHeader } from "@/components/navigation/SubHeader";
import { fetchMatch, deleteMatch } from "../../api";
import { initialMatchValues, mapMatchDataToMatchForm } from "../../schema";
import { IMatchDetailsInput } from "../../types";
import CustomLoader from "@/components/CustomLoader";

export default function EditMatchPage() {
  const [values, setValues] = useState<IMatchDetailsInput | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    fetchMatch(id)
      .then((data) => {
        if (data) {
          setValues(mapMatchDataToMatchForm(data));
        } else {
          setValues({ ...initialMatchValues });
        }
      })
      .catch((error) => {
        console.error("Error fetching match:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // const onSubmit = (data: IMatchInput) => {
  //   setLoading(true);

  //   updateMatch(id, data)
  //     .then(() => {
  //       notifications.show({
  //         title: "Success",
  //         message: "Match updated successfully",
  //         color: "green",
  //       });
  //       router.push("/matches");
  //     })
  //     .catch((error) => {
  //       console.error("client error", error);
  //       setLoading(false);
  //       notifications.show({
  //         title: "Error",
  //         message: "Something went wrong while updating the match",
  //         color: "red",
  //       });
  //     });
  // };

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
      {!loading && values ? (
        <>
          {/* <MatchForm values={values} playerOptions={[]} onSubmit={onSubmit} /> */}
        </>
      ) : (
        <CustomLoader label="Deleting Match" />
      )}
    </>
  );
}
