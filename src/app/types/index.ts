export type Params = Promise<{ id: string }>;

export type IPlayer = {
  name: string;
  nationality: string;
  dob: string | Date; // ISO date string
  isActive: boolean;
};
