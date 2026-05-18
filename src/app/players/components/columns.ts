export const matchColumns = [
  { key: "label", label: "", border: true },
  { key: "played", label: "Pl", width: 50, border: true },
  { key: "wins", label: "W", width: 50 },
  { key: "draws", label: "D", width: 50 },
  { key: "losses", label: "L", width: 50, border: true },
  { key: "goalsFor", label: "GF", width: 50 },
  { key: "goalsAgainst", label: "GA", width: 50 },
  {
    key: "goalDiff",
    label: "GD",
    width: 50,
    getColor: (v: unknown) => {
      if (typeof v !== "number") return undefined;
      if (v > 0) return "var(--mantine-color-green-6)";
      if (v < 0) return "var(--mantine-color-red-6)";
      return undefined;
    },
  },
];

export const playerColumns = [
  { key: "label", label: "", border: true },
  { key: "goals", label: "Goals", width: 80 },
  { key: "assists", label: "Assists", width: 80, border: true },
  { key: "combined", label: "Combined", width: 80 },
];
