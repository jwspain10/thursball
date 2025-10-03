export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const NAV_LINKS = [
  { label: "Home", link: "/" },
  {
    label: "Matches",
    link: "/matches",
  },
  { label: "Players", link: "/players" },
  { label: "Stats", link: "/stats" },
  { label: "Admin", link: "/admin", auth: ROLES.ADMIN },
];

export const STORAGE_KEYS = {
  DETAILS: "details",
  PLAYERS: "players",
};
