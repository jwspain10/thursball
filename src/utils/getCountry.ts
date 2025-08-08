import countries from "i18n-iso-countries";

export const getCountry = (code: string): string => {
  const countryNames = countries.getNames("en", { select: "official" });

  return countryNames[code] || "Unknown Country";
};
