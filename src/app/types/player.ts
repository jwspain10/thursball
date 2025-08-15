import { Player } from "@prisma/client";

export type IPlayer = {
  name: string;
  nationality: string;
  dob: Date;
  isActive: boolean;
};

export type IPlayerInput = {
  name: string;
  nationality: string;
  dob: Date;
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
