import CustomTable from "@/components/CustomTable";
import { fetchPlayerStats } from "../api/fetchPlayerStats";
import { getAverage } from "@/utils/getAverage";

interface Props {
  playerId: string;
}

export default async function PlayerStats({ playerId }: Props) {
  const { _sum, _count } = (await fetchPlayerStats(playerId)) || {};

  const { goals, assists, mvp } = _sum || {};

  const rows = [
    {
      label: "Played",
      value: _count?.matchId || 0,
      average: null,
    },
    {
      label: "Goals",
      value: goals || 0,
      average: getAverage(_count?.matchId || 0, goals || 0),
    },
    {
      label: "Assists",
      value: assists || 0,
      average: getAverage(_count?.matchId || 0, assists || 0),
    },
    {
      label: "Mvp",
      value: mvp || 0,
      average: getAverage(_count?.matchId || 0, mvp || 0),
    },
  ];

  const columns = [
    { key: "label", label: "" },
    { key: "value", label: "Total" },
    { key: "average", label: "Per game" },
  ];

  return <CustomTable rows={rows} columns={columns} />;
}
