export interface IMatchDetailsInput {
  matchDate: Date;
  scoreTeam1: number;
  scoreTeam2: number;
  nameTeam1: string;
  nameTeam2: string;
}

export interface IMatchPlayerIdsInput {
  team1Players: string[];
  team2Players: string[];
}

export interface IMatchPlayerStatsInput {
  playerId: string;
  player: { name: string };
  goals: number;
  assists: number;
  conceded: number;
  mvp: number;
}

export interface IMatchSubmitInput extends IMatchDetailsInput {
  team1Players: IMatchPlayerStatsInput[];
  team2Players: IMatchPlayerStatsInput[];
}
