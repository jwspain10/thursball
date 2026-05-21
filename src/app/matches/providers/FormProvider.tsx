import { createContext, useContext, useState } from "react";
import {
  IMatchDetailsInput,
  IMatchPlayerIdsInput,
  IMatchPlayerStatsInput,
} from "../types";
import { initialMatchPlayers, initialMatchValues } from "../schema";

interface Props {
  children: React.ReactElement;
  initialDetails?: IMatchDetailsInput;
  initialPlayerIds?: IMatchPlayerIdsInput;
  initialPlayerStats?: IMatchPlayerStatsInput[];
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
export const FormProvider = ({
  children,
  initialDetails,
  initialPlayerIds,
  initialPlayerStats,
}: Props) => {
  const [matchDetails, setMatchDetails] = useState<IMatchDetailsInput>(
    initialDetails ?? initialMatchValues,
  );
  const [matchPlayerIds, setMatchPlayerIds] = useState<IMatchPlayerIdsInput>(
    initialPlayerIds ?? initialMatchPlayers,
  );
  const [matchPlayerStats, setMatchPlayerStats] = useState<
    IMatchPlayerStatsInput[]
  >(initialPlayerStats ?? []);

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
