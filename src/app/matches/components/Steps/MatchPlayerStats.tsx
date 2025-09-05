"use client";

import { ISelectOptions } from "@/app/types";
import { useFormContext } from "../../providers/FormProvider";
import { IMatchPlayerStatsInput } from "../../types";
import MatchPlayersTable from "../MatchPlayersTable";
import { useEffect, useState } from "react";
import FormContainer from "@/components/FormContainer";
import { useForm } from "react-hook-form";
import { rows } from "../TableRows";

interface Props {
  playerOptions: ISelectOptions[];
  onNextClick: () => void;
}

export default function MatchPlayerStatsForm({
  playerOptions,
  onNextClick,
}: Props) {
  const [currentPlayerStats, setCurrentPlayerStats] = useState<
    IMatchPlayerStatsInput[]
  >([]);
  const { matchPlayerStats, matchPlayerIds, setMatchPlayerStats } =
    useFormContext() || {};

  const { handleSubmit } = useForm();

  const getName = (id: string) =>
    playerOptions.find((player) => player.value === id)?.label;

  useEffect(() => {
    const getTeamPlayers = (teamPlayers: string[]) =>
      teamPlayers.map((id) => {
        const playerStats = currentPlayerStats.find(
          (player) => player.playerId === id
        );

        if (playerStats) {
          return playerStats;
        } else {
          return {
            playerId: id,
            player: {
              name: getName(id) || "",
            },
            goals: 0,
            assists: 0,
            conceded: 0,
            mvp: 0,
          };
        }
      });
    const team1 = getTeamPlayers(matchPlayerIds?.team1Players || []);
    const team2 = getTeamPlayers(matchPlayerIds?.team2Players || []);

    setCurrentPlayerStats([...team1, ...team2]);
  }, [matchPlayerStats]);

  const onSubmitStats = (values: IMatchPlayerStatsInput) => {
    const updatedStats = currentPlayerStats.map((player) => {
      if (player.playerId === values.playerId) {
        return { ...values, player: { name: getName(player.playerId) || "" } };
      } else {
        return player;
      }
    });

    setCurrentPlayerStats(updatedStats);
  };

  const team1Players = currentPlayerStats?.filter((player) =>
    matchPlayerIds?.team1Players.includes(player.playerId)
  );
  const team2Players = currentPlayerStats?.filter((player) =>
    matchPlayerIds?.team2Players.includes(player.playerId)
  );

  const onSubmit = () => {
    if (setMatchPlayerStats) {
      setMatchPlayerStats(currentPlayerStats);
      onNextClick();
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <>
        <div>Team1</div>
        <div>
          <MatchPlayersTable rows={rows(team1Players, onSubmitStats)} />
        </div>
        <div>Team2</div>
        <div>
          <MatchPlayersTable rows={rows(team2Players, onSubmitStats)} />
        </div>
      </>
    </FormContainer>
  );
}
