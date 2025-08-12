import { LinkButton } from "@/components/LinkButton";
import { Params } from "@/app/types";
import { SubHeader } from "@/components/SubHeader";
import MatchDetails from "./MatchDetails";
import MatchPlayersTable from "./MatchPlayersTable";
import { fetchMatch } from "@/actions/match/fetchMatch";

export default async function PlayerPage({ params }: { params: Params }) {
  const { id } = await params;

  const match = await fetchMatch(id);

  const getPlayersInTeam = (teamId: string) =>
    match?.MatchPlayerStats.filter((stat) => stat.teamId === teamId);

  return (
    <div>
      <LinkButton link={`/matches/${id}/edit`} label="Edit Match" />
      <SubHeader goBack>Match Details</SubHeader>
      {match && <MatchDetails match={match} />}
      <h3>Team 1</h3>
      {match && (
        <MatchPlayersTable players={getPlayersInTeam(match?.team1Id)} />
      )}
      <h3>Team 2</h3>
      {match && (
        <MatchPlayersTable players={getPlayersInTeam(match?.team2Id)} />
      )}
    </div>
  );
}
