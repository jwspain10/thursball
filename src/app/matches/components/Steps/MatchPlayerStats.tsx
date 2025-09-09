"use client";

import { ISelectOptions } from "@/app/types";
import { useFormContext } from "../../providers/FormProvider";
import { IMatchPlayerStatsInput } from "../../types";
import { useEffect, useState } from "react";
import FormContainer from "@/components/FormContainer";
import { useForm } from "react-hook-form";
import StatsFormModal from "../StatsFormModal";
import CustomTable from "@/components/CustomTable";

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
    return selectedPlayers?.map((player) => {
      const { goals, assists, conceded, mvp } = player;
      return {
        name: player.player.name,
        goals,
        assists,
        conceded,
        mvp,
        stats: <StatsFormModal player={player} onSubmit={onSubmitStats} />,
      };
    });
  };

  const columns = [
    { key: "name", label: "" },
    { key: "goals", label: "Gs" },
    { key: "assists", label: "As" },
    { key: "conceded", label: "Cn" },
    { key: "mvp", label: "Mvp" },
    { key: "stats", label: "" },
  ];

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <>
        <div>Team1</div>

        <CustomTable rows={getRows(team1Players)} columns={columns} />

        <div>Team2</div>

        <CustomTable rows={getRows(team2Players)} columns={columns} />
      </>
    </FormContainer>
  );
}
