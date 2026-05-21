jest.mock("i18n-iso-countries", () => ({
  __esModule: true,
  default: {
    getNames: jest.fn(),
  },
}));

import { getCountry } from "../getCountry";
import countries from "i18n-iso-countries";

const mockGetNames = countries.getNames as jest.Mock;

describe("getCountry", () => {
  beforeEach(() => {
    mockGetNames.mockReturnValue({
      US: "United States of America",
      GB: "United Kingdom of Great Britain and Northern Ireland",
    });
  });

  it("returns the country name for a valid code", () => {
    expect(getCountry("US")).toBe("United States of America");
  });

  it("returns the country name for another valid code", () => {
    expect(getCountry("GB")).toBe(
      "United Kingdom of Great Britain and Northern Ireland",
    );
  });

  it("returns 'Unknown Country' for an unrecognised code", () => {
    expect(getCountry("XX")).toBe("Unknown Country");
  });

  it("returns 'Unknown Country' for an empty string", () => {
    expect(getCountry("")).toBe("Unknown Country");
  });
});
