jest.mock("i18n-iso-countries", () => ({
  __esModule: true,
  default: {
    registerLocale: jest.fn(),
    getNames: jest.fn(),
  },
}));

jest.mock("i18n-iso-countries/langs/en.json", () => ({}));

import { getCountryOptions } from "../getCountryOptions";
import countries from "i18n-iso-countries";

const mockGetNames = countries.getNames as jest.Mock;

describe("getCountryOptions", () => {
  beforeEach(() => {
    mockGetNames.mockReturnValue({
      US: "United States of America",
      DE: "Germany",
    });
  });

  it("returns an array of select options from country names", () => {
    expect(getCountryOptions()).toEqual([
      { value: "US", label: "United States of America" },
      { value: "DE", label: "Germany" },
    ]);
  });

  it("each option has a value and a label", () => {
    const result = getCountryOptions();
    result.forEach((option) => {
      expect(option).toHaveProperty("value");
      expect(option).toHaveProperty("label");
    });
  });

  it("returns an empty array when no countries are available", () => {
    mockGetNames.mockReturnValue({});
    expect(getCountryOptions()).toEqual([]);
  });
});
