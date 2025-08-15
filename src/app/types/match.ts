import { Match, Team } from "@prisma/client";

export interface IMatch extends Match {
  team1: Team;
  team2: Team;
}

export interface IMatchInput {
  matchDate: Date;
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
}

export type IStatsInput = {
  goals: number;
  assists: number;
  conceded: number;
  mvp: boolean;
};
