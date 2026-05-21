import { Match } from "@prisma/client";
import {
  IMatchDetailsInput,
  IMatchPlayerIdsInput,
  IMatchSubmitInput,
} from "../types";
import { IMatchResponse } from "../types/response_types";
import { getName } from "@/utils/getName";

export const initialMatchValues: IMatchDetailsInput = {
  nameTeam1: "",
  nameTeam2: "",
  scoreTeam1: 0,
  scoreTeam2: 0,
  matchDate: new Date(),
};

export const initialMatchPlayers: IMatchPlayerIdsInput = {
  team1Players: [],
  team2Players: [],
};

export const initialStatsValues = {
  goals: 0,
  assists: 0,
};

export const mapMatchDataToMatchForm = (
  matchData: Match,
): IMatchDetailsInput => {
  const { matchDate, team1Id, team2Id, scoreTeam1, scoreTeam2 } = matchData;
  return {
    matchDate,
    nameTeam1: team1Id,
    nameTeam2: team2Id,
    scoreTeam1: scoreTeam1,
    scoreTeam2: scoreTeam2,
  };
};

export const mapMatchResponseToSubmitInput = (
  matchData: IMatchResponse,
): IMatchSubmitInput => {
  const { matchDate, scoreTeam1, scoreTeam2, team1, team2 } = matchData;
  return {
    matchDate,
    nameTeam1: team1.name,
    nameTeam2: team2.name,
    scoreTeam1,
    scoreTeam2,
    team1Players: team1.matchPlayerStats.map((s) => ({
      playerId: s.playerId,
      player: {
        name: getName(s.player.name, s.player.lastName || "").fullName,
      },
      goals: s.goals,
      assists: s.assists,
    })),
    team2Players: team2.matchPlayerStats.map((s) => ({
      playerId: s.playerId,
      player: {
        name: getName(s.player.name, s.player.lastName || "").fullName,
      },
      goals: s.goals,
      assists: s.assists,
    })),
  };
};
