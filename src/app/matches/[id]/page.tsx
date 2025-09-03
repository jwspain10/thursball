import { LinkButton } from "@/components/LinkButton";
import { Params } from "@/app/types";
import { SubHeader } from "@/components/SubHeader";
import MatchDetails from "../components/MatchDetails";
import MatchPlayersTable from "../components/MatchPlayersTable";
import { fetchMatch } from "../api/fetchMatch";
import { IMatchPlayerStatsResponse } from "../types";

export default async function MatchPage({ params }: { params: Params }) {
  const { id } = await params;

  const match = await fetchMatch(id);
  console.log(match);

  const getRows = (teamPlayers: IMatchPlayerStatsResponse[]) => {
    return teamPlayers.map((player: IMatchPlayerStatsResponse) => {
      const { playerId, goals, assists, conceded, mvp } = player;
      return (
        <tr key={playerId}>
          <td>{player.player.name}</td>
          <td>{goals}</td>
          <td>{assists}</td>
          <td>{conceded}</td>
          <td>{mvp}</td>
        </tr>
      );
    });
  };

  const { team1, team2 } = match || {};

  return (
    <div>
      <LinkButton link={`/matches/${id}/edit`} label="Edit Match" />
      <SubHeader goBack>Match Details</SubHeader>
      {match && <MatchDetails match={match} />}
      <h3>Team 1</h3>
      {match && (
        <MatchPlayersTable rows={getRows(team1?.matchPlayerStats || [])} />
      )}
      <h3>Team 2</h3>
      {match && (
        <MatchPlayersTable rows={getRows(team2?.matchPlayerStats || [])} />
      )}
    </div>
  );
}
