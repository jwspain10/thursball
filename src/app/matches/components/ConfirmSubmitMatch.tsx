import FormContainer from "@/components/FormContainer";
import { useFormContext } from "../providers/FormProvider";
import { useForm } from "react-hook-form";
import { IMatchPlayerStatsInput, IMatchSubmitInput } from "../types";
import CustomTable from "@/components/CustomTable";

interface Props {
  onSubmit: (data: IMatchSubmitInput) => void;
}

export default function ConfirmSubmitMatch({ onSubmit }: Props) {
  const { matchDetails, matchPlayerIds, matchPlayerStats } =
    useFormContext() || {};

  const formatMatchValues = (): IMatchSubmitInput => {
    return {
      ...matchDetails,
      team1Players: matchPlayerStats?.filter((player) =>
        matchPlayerIds?.team1Players.includes(player.playerId)
      ),
      team2Players: matchPlayerStats?.filter((player) =>
        matchPlayerIds?.team2Players.includes(player.playerId)
      ),
    } as IMatchSubmitInput;
  };

  const { handleSubmit } = useForm({
    defaultValues: formatMatchValues(),
  });

  const getRows = (teamPlayers: IMatchPlayerStatsInput[]) => {
    return teamPlayers?.map((player) => {
      const { goals, assists, mvp } = player;
      return {
        name: player.player.name,
        goals,
        assists,
        mvp,
      };
    });
  };

  const columns = [
    { key: "name", label: "" },
    { key: "goals", label: "Gs" },
    { key: "assists", label: "As" },
    { key: "mvp", label: "Mvp" },
  ];

  return (
    matchDetails &&
    matchPlayerIds && (
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <>
          {matchPlayerStats && (
            <CustomTable rows={getRows(matchPlayerStats)} columns={columns} />
          )}
        </>
      </FormContainer>
    )
  );
}
