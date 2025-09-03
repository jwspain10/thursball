import { Table, TableThead, TableTbody } from "@mantine/core";
import { ReactElement } from "react";

interface Props {
  rows: ReactElement[];
}

export default function MatchPlayersTable({ rows }: Props) {
  return (
    <Table>
      <TableThead>
        <tr>
          <th>Name</th>
          <th>Goals</th>
          <th>Assists</th>
          <th>Conceded</th>
          <th>MVP</th>
          <th></th>
        </tr>
      </TableThead>
      <TableTbody>{rows}</TableTbody>
    </Table>
  );
}
