export interface IMatchPlayerStatsResponse {
  assists: number;
  conceded: number;
  goals: number;
  id: string;
  matchId: string;
  mvp: number;
  player: { name: string };
  playerId: string;
  teamId: string;
}

export interface ITeamInMatchResponse {
  id: string;
  name: string;
  matchPlayerStats: IMatchPlayerStatsResponse[];
}

export interface IMatchResponse {
  id: string;
  matchDate: Date;
  scoreTeam1: number;
  scoreTeam2: number;
  team1: ITeamInMatchResponse;
  team2: ITeamInMatchResponse;
}
