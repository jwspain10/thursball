import { SubHeader } from "@/components/navigation/SubHeader";
import { fetchAllPlayerStats } from "./api/fetchAllPlayerStats";
import { getName } from "@/utils/getName";
import CustomSortingTable from "@/components/SortingTable";

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
        mvps,
      } = stat;

      return {
        name: getName(name, lastName || "").nameAndInitial,
        lastName,
        played,
        wins,
        draws,
        losses,
        goals,
        assists,
        mvps,
      };
    });
  };

  const columns = [
    { key: "name", label: "", size: 120, align: "left", border: true },
    { key: "played", label: "Pl", border: true },
    { key: "wins", label: "W" },
    { key: "draws", label: "D" },
    { key: "losses", label: "L", border: true },
    { key: "goals", label: "Gs" },
    { key: "assists", label: "As", border: true },
    { key: "mvps", label: "Mvp" },
  ];

  return (
    <div>
      <SubHeader goBack>All Stats</SubHeader>
      {stats && <CustomSortingTable data={getRows()} columns={columns} />}
    </div>
  );
}
