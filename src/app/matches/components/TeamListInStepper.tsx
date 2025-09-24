import CustomTable from "@/components/CustomTable";
import { IMatchPlayerStatsInput } from "../types";
import CurrentTotals from "./CurrentTotals";
import BoxContainer from "@/components/BoxContainer";

type TableRow = Record<string, unknown>;

interface Props<T extends TableRow> {
  teamName?: string;
  teamScore?: number;
  players?: IMatchPlayerStatsInput[];
  rows: T[];
}

const columns = [
  { key: "name", label: "" },
  { key: "goals", label: "Gs" },
  { key: "assists", label: "As" },
  { key: "mvp", label: "Mvp" },
  { key: "stats", label: "" },
];

export default function TeamListInStepper<T extends TableRow>({
  teamName,
  teamScore,
  players,
  rows,
}: Props<T>) {
  return (
    <BoxContainer title={teamName}>
      <CurrentTotals players={players} teamScore={teamScore || 0} />
      <CustomTable rows={rows} columns={columns} />
    </BoxContainer>
  );
}
