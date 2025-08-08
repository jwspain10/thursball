import countries from "i18n-iso-countries";
// eslint-disable @typescript-eslint/no-var-requires
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export const getCountryOptions = (): {
  value: string;
  label: string;
}[] => {
  const countryNames = countries.getNames("en", { select: "official" });

  const countryCodes = Object.keys(countryNames);

  const selectOptions = countryCodes.map((code) => ({
    value: code,
    label: countryNames[code],
  }));

  return selectOptions;
};
