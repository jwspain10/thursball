import { LinkButton } from "@/components/LinkButton";
import { Params } from "@/app/types";
import { SubHeader } from "@/components/SubHeader";
import MatchDetails from "../components/MatchDetails";
import { fetchMatch } from "../api/fetchMatch";
import { IMatchPlayerStatsResponse } from "../types";
import CustomTable from "@/components/CustomTable";

export default async function MatchPage({ params }: { params: Params }) {
  const { id } = await params;

  const match = await fetchMatch(id);

  const getRows = (teamPlayers: IMatchPlayerStatsResponse[]) => {
    return teamPlayers?.map((player) => {
      const { goals, assists, conceded, mvp } = player;
      return {
        name: player.player.name,
        goals,
        assists,
        conceded,
        mvp,
      };
    });
  };

  const { team1, team2 } = match || {};

  const columns = [
    { key: "name", label: "" },
    { key: "goals", label: "Gs" },
    { key: "assists", label: "As" },
    { key: "conceded", label: "Cn" },
    { key: "mvp", label: "Mvp" },
  ];

  return (
    <div>
      <SubHeader
        goBack
        button={<LinkButton link={`/matches/${id}/edit`} label="Edit Match" />}
      >
        Match Details
      </SubHeader>
      {match && <MatchDetails match={match} />}
      <h3>Team 1</h3>
      {match && (
        <CustomTable
          rows={getRows(team1?.matchPlayerStats || [])}
          columns={columns}
        />
      )}
      <h3>Team 2</h3>
      {match && (
        <CustomTable
          rows={getRows(team2?.matchPlayerStats || [])}
          columns={columns}
        />
      )}
    </div>
  );
}
