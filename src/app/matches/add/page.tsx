"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { createMatch } from "../api/createMatch";
import FormStepper from "../components/FormStepper";
import { IMatchSubmitInput } from "../types";

export default function AddMatchPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (data: IMatchSubmitInput) => {
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

  return !loading ? <FormStepper onSubmit={onSubmit} /> : <div>Loading...</div>;
}
