"use client";

import { ISelectOptions } from "@/app/types";
import { useFormContext } from "../../providers/FormProvider";
import { IMatchPlayerStatsInput } from "../../types";
import { useEffect, useState } from "react";
import FormContainer from "@/components/FormContainer";
import { useForm } from "react-hook-form";
import StatsForm from "../StatsForm";
import TeamListInStepper from "../TeamListInStepper";

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
  const {
    matchDetails,
    matchPlayerStats,
    matchPlayerIds,
    setMatchPlayerStats,
  } = useFormContext() || {};

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
            mvp: 0,
          };
        }
      });
    const team1 = getTeamPlayers(matchPlayerIds?.team1Players || []);
    const team2 = getTeamPlayers(matchPlayerIds?.team2Players || []);

    setCurrentPlayerStats([...team1, ...team2]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getRows = (selectedPlayers: IMatchPlayerStatsInput[]) => {
    const mappedPlayers = selectedPlayers?.map((player) => {
      const { goals, assists, mvp } = player;
      return {
        name: player.player.name,
        goals,
        assists,
        mvp,
        stats: (
          <StatsForm
            values={{ ...player, player: { name: player.player.name } }}
            onSubmit={onSubmitStats}
          />
        ),
      };
    });
    return mappedPlayers;
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <>
        <TeamListInStepper
          teamName={matchDetails?.nameTeam1 || ""}
          teamScore={matchDetails?.scoreTeam1}
          players={team1Players}
          rows={getRows(team1Players)}
        />

        <TeamListInStepper
          teamName={matchDetails?.nameTeam2 || ""}
          teamScore={matchDetails?.scoreTeam2}
          players={team2Players}
          rows={getRows(team2Players)}
        />
      </>
    </FormContainer>
  );
}
