import FormContainer from "@/components/FormContainer";
import { useFormContext } from "../providers/FormProvider";
import MatchPlayersTable from "./MatchPlayersTable";
import { rows } from "./TableRows";
import { useForm } from "react-hook-form";
import { IMatchSubmitInput } from "../types";

interface Props {
  onSubmit: (data: IMatchSubmitInput) => void;
}

export default function ConfirmSubmitMatch({ onSubmit }: Props) {
  const { matchDetails, matchPlayerIds, matchPlayerStats } =
    useFormContext() || {};

  console.log(matchDetails);
  console.log("stats", matchPlayerStats);
  console.log("ids", matchPlayerIds);

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

  return (
    matchDetails &&
    matchPlayerIds && (
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <>
          {matchPlayerStats && (
            <MatchPlayersTable rows={rows(matchPlayerStats)} />
          )}
        </>
      </FormContainer>
    )
  );
}
