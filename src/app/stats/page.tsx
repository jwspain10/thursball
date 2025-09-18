import { SubHeader } from "@/components/SubHeader";
import CustomTable from "@/components/CustomTable";
import { fetchAllPlayerStats } from "./api/fetchAllPlayerStats";

export default async function StatsPage() {
  const stats = await fetchAllPlayerStats();

  const getRows = () => {
    return stats?.map((stat) => {
      const {
        name,
        lastName,
        played,
        wins,
        draws,
        losses,
        goals,
        assists,
        conceded,
        mvps,
      } = stat;

      return {
        name,
        lastName,
        played,
        wins,
        draws,
        losses,
        goals,
        assists,
        mvps,
        conceded,
      };
    });
  };

  const columns = [
    { key: "name", label: "" },
    { key: "played", label: "Pl" },
    { key: "wins", label: "W" },
    { key: "draws", label: "D" },
    { key: "losses", label: "L" },
    { key: "goals", label: "Gs" },
    { key: "assists", label: "As" },
    { key: "conceded", label: "Cn" },
    { key: "mvp", label: "Mvp" },
  ];

  return (
    <div>
      <SubHeader goBack>Stats</SubHeader>
      {stats && <CustomTable rows={getRows()} columns={columns} />}
    </div>
  );
}
