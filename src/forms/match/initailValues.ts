export const initialMatchValues = {
  team1Name: "",
  team2Name: "",
  team1Score: 0,
  team2Score: 0,
  matchDate: new Date().toISOString().split("T")[0], // Default to today's date
  team1Players: [],
  team2Players: [],
};

export const initialStatsValues = {
  playerId: "",
  goals: 0,
  assists: 0,
  conceded: 0,
  mvp: false,
};
