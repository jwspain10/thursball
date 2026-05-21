import { Player } from "@prisma/client";
import { getPlayerOptions } from "../getPlayerOptions";

const makePlayers = (overrides: Partial<Player>[] = []): Player[] =>
  overrides.map((o, i) => ({
    id: String(i + 1),
    name: `Player ${i + 1}`,
    lastName: null,
    nationality: "US",
    isActive: true,
    ...o,
  }));

describe("getPlayerOptions", () => {
  it("maps players to select options using id and name", () => {
    const players = makePlayers([
      { id: "abc", name: "Alice" },
      { id: "def", name: "Bob" },
    ]);

    expect(getPlayerOptions(players)).toEqual([
      { value: "abc", label: "Alice" },
      { value: "def", label: "Bob" },
    ]);
  });

  it("returns an empty array for an empty player list", () => {
    expect(getPlayerOptions([])).toEqual([]);
  });

  it("preserves the order of players", () => {
    const players = makePlayers([
      { id: "3", name: "Charlie" },
      { id: "1", name: "Alice" },
      { id: "2", name: "Bob" },
    ]);

    const result = getPlayerOptions(players);
    expect(result.map((o) => o.label)).toEqual(["Charlie", "Alice", "Bob"]);
  });
});
