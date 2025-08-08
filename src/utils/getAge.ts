import dayjs from "dayjs";

export const getAge = (dob: string | Date): number => {
  const bDate = typeof dob === "string" ? new Date(dob) : dob;

  const today = dayjs();
  const birthDate = dayjs(bDate);
  return today.diff(birthDate, "year");
};
