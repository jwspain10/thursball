import { Match } from "@prisma/client";
import { IMatchDetailsInput, IMatchPlayerIdsInput } from "../types";

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
  conceded: 0,
  mvp: 0,
};

export const mapMatchDataToMatchForm = (
  matchData: Match
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
