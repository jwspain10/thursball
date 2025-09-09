import CustomTable from "@/components/CustomTable";
import { fetchPlayerMatchStats } from "../api/fetchPlayerMatchStats";
import { getPercentage } from "@/utils/getPercentage";

interface Props {
  playerId: string;
}

export default async function PlayerMatchStats({ playerId }: Props) {
  const { played, wins, losses, draws } =
    (await fetchPlayerMatchStats(playerId)) || {};

  const rows = [
    {
      label: "Played",
      value: played,
      average: null,
    },
    {
      label: "Wins",
      value: wins || 0,
      average: getPercentage(played || 0, wins || 0),
    },
    {
      label: "Draws",
      value: draws || 0,
      average: getPercentage(played || 0, draws || 0),
    },
    {
      label: "Losses",
      value: losses || 0,
      average: getPercentage(played || 0, losses || 0),
    },
  ];

  const columns = [
    { key: "label", label: "" },
    { key: "value", label: "Total" },
    { key: "average", label: "%" },
  ];

  return <CustomTable rows={rows} columns={columns} />;
}
