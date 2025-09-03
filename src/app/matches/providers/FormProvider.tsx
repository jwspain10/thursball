import { createContext, useContext, useState } from "react";
import {
  IMatchDetailsInput,
  IMatchPlayerIdsInput,
  IMatchPlayerStatsInput,
} from "../types";
import { initialMatchPlayers, initialMatchValues } from "../schema";

interface Props {
  children: React.ReactElement;
}

// 1. Create context
interface FormContextType {
  matchDetails: IMatchDetailsInput;
  setMatchDetails: React.Dispatch<React.SetStateAction<IMatchDetailsInput>>;
  matchPlayerIds: IMatchPlayerIdsInput;
  setMatchPlayerIds: React.Dispatch<React.SetStateAction<IMatchPlayerIdsInput>>;
  matchPlayerStats: IMatchPlayerStatsInput[];
  setMatchPlayerStats: React.Dispatch<
    React.SetStateAction<IMatchPlayerStatsInput[]>
  >;
}

const FormContext = createContext<FormContextType | null>(null);

// 2. Provider component
export const FormProvider = ({ children }: Props) => {
  const [matchDetails, setMatchDetails] =
    useState<IMatchDetailsInput>(initialMatchValues);
  const [matchPlayerIds, setMatchPlayerIds] =
    useState<IMatchPlayerIdsInput>(initialMatchPlayers);
  const [matchPlayerStats, setMatchPlayerStats] = useState<
    IMatchPlayerStatsInput[]
  >([]);

  return (
    <FormContext.Provider
      value={{
        matchDetails,
        setMatchDetails,
        matchPlayerIds,
        setMatchPlayerIds,
        matchPlayerStats,
        setMatchPlayerStats,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
