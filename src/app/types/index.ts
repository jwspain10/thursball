import { Match, Player, Team } from "@prisma/client";

export type Params = Promise<{ id: string }>;

export type IPlayer = {
  name: string;
  nationality: string;
  dob: string | Date; // ISO date string
  isActive: boolean;
};

export type IPlayerInMatch = {
  playerId: string;
  player: Player;
  goals: number;
  assists: number;
  conceded: number;
  mvp: number;
};

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

export type ISelectOptions = {
  label: string;
  value: string;
};
