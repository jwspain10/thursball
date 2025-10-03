import { LinkButton } from "@/components/navigation/LinkButton";
import { Params } from "@/app/types";
import { SubHeader } from "@/components/navigation/SubHeader";
import MatchDetails from "../components/MatchDetails";
import { fetchMatch } from "../api/fetchMatch";
import { IMatchPlayerStatsResponse } from "../types";
import CustomTable from "@/components/CustomTable";
import { auth } from "../../../../auth";
import { getAuthRole } from "@/utils/getAuthRole";
import { getName } from "@/utils/getName";

export default async function MatchPage({ params }: { params: Params }) {
  const session = await auth();
  const { isAdmin } = getAuthRole(session);
  const { id } = await params;

  const match = await fetchMatch(id);

  const getRows = (teamPlayers: IMatchPlayerStatsResponse[]) => {
    return teamPlayers?.map((player) => {
      const {
        goals,
        assists,
        mvp,
        player: { name, lastName },
      } = player;
      return {
        name: getName(name, lastName || "").nameAndInitial,
        goals,
        assists,
        mvp,
      };
    });
  };

  const { team1, team2 } = match || {};

  const columns = [
    { key: "name", label: "" },
    { key: "goals", label: "Gs" },
    { key: "assists", label: "As" },
    { key: "mvp", label: "Mvp" },
  ];

  return (
    <div>
      <SubHeader
        goBack
        button={
          isAdmin ? (
            <LinkButton link={`/matches/${id}/edit`} label="Edit Match" />
          ) : null
        }
      >
        Match Details
      </SubHeader>
      {match && <MatchDetails match={match} />}
      <h3>{match?.team1.name}</h3>
      {match && (
        <CustomTable
          rows={getRows(team1?.matchPlayerStats || [])}
          columns={columns}
        />
      )}
      <h3>{match?.team2.name}</h3>
      {match && (
        <CustomTable
          rows={getRows(team2?.matchPlayerStats || [])}
          columns={columns}
        />
      )}
    </div>
  );
}
