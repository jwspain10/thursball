import { SubHeader } from "@/components/navigation/SubHeader";
import CustomSortingTable from "@/components/tables/SortingTable";
import { fetchTeamStats } from "../api";
import { WinsPieChart } from "./WinsPieChart";

export default async function MatchesStatsPage() {
  const stats = await fetchTeamStats();

  const rows = Object.entries(stats).map(([teamName, stat]) => ({
    name: teamName,
    played: stat.played,
    wins: stat.wins,
    draws: stat.draws,
    losses: stat.losses,
    goalsFor: stat.goalsFor,
    goalsAgainst: stat.goalsAgainst,
  }));

  const columns = [
    { key: "name", label: "", size: 100, align: "left", border: true },
    { key: "played", label: "Pl", border: true },
    { key: "wins", label: "W" },
    { key: "draws", label: "D" },
    { key: "losses", label: "L", border: true },
    { key: "goalsFor", label: "GF" },
    { key: "goalsAgainst", label: "GA" },
  ];

  return (
    <div>
      <SubHeader goBack>Match Stats</SubHeader>
      <CustomSortingTable data={rows} columns={columns} />
      <WinsPieChart stats={stats} />
    </div>
  );
}
