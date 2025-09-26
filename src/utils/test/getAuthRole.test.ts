// src/utils/getAuthRole.test.ts
import { getAuthRole } from "../getAuthRole";

// Mock ROLES constant
const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};

describe("getAuthRole", () => {
  it("returns false for both isUser and isAdmin when session is null", () => {
    expect(getAuthRole(null)).toEqual({ isUser: false, isAdmin: false });
  });

  it("returns true for both isUser and isAdmin when role is ADMIN", () => {
    const session = { user: { role: ROLES.ADMIN } };
    expect(getAuthRole(session)).toEqual({ isUser: true, isAdmin: true });
  });

  it("returns true for isUser and false for isAdmin when role is USER", () => {
    const session = { user: { role: ROLES.USER } };
    expect(getAuthRole(session)).toEqual({ isUser: true, isAdmin: false });
  });

  it("returns false for both isUser and isAdmin when role is unknown", () => {
    const session = { user: { role: "GUEST" } };
    expect(getAuthRole(session)).toEqual({ isUser: false, isAdmin: false });
  });
});
