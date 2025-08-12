import { IPlayerInMatch } from "@/app/types";
import { Table, TableThead, TableTbody } from "@mantine/core";

interface Props {
  players?: IPlayerInMatch[];
}

export default function MatchPlayersTable({ players }: Props) {
  const rows = players?.map((player) => {
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

  return (
    <Table>
      <TableThead>
        <tr>
          <th>Name</th>
          <th>Goals</th>
          <th>Assists</th>
          <th>Conceded</th>
          <th>MVP</th>
        </tr>
      </TableThead>
      <TableTbody>{rows}</TableTbody>
    </Table>
  );
}
