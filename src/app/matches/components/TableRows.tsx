import CustomModal from "@/components/CustomModal";
import { IMatchPlayerStatsInput } from "../types";
import StatsForm from "./StatsForm";
import { Button } from "@mantine/core";

export const rows = (
  selectedPlayers: IMatchPlayerStatsInput[],
  onSubmit?: (values: IMatchPlayerStatsInput) => void
) =>
  selectedPlayers?.map((player) => {
    const { playerId, goals, assists, mvp } = player;

    return (
      <tr key={playerId}>
        <td>{player.player.name}</td>
        <td>{goals}</td>
        <td>{assists}</td>
        <td>{mvp}</td>
        {onSubmit && (
          <td>
            <CustomModal
              title={player.player.name}
              button={<Button>Stats</Button>}
            >
              <StatsForm
                values={{ ...player, player: { name: player.player.name } }}
                onSubmit={onSubmit}
              />
            </CustomModal>
          </td>
        )}
      </tr>
    );
  });
