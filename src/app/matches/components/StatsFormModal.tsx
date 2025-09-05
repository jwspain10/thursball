import CustomModal from "@/components/CustomModal";
import { Button } from "@mantine/core";
import StatsForm from "./StatsForm";
import { IMatchPlayerStatsInput } from "../types";

interface Props {
  player: IMatchPlayerStatsInput;
  onSubmit: (values: IMatchPlayerStatsInput) => void;
}

export default function StatsFormModal({ player, onSubmit }: Props) {
  return (
    <CustomModal title={player.player.name} button={<Button>Stats</Button>}>
      <StatsForm
        values={{ ...player, player: { name: player.player.name } }}
        onSubmit={onSubmit}
      />
    </CustomModal>
  );
}
