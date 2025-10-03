import { auth } from "../auth";

export const middleware = auth((req) => {
  const isAdmin = req.auth?.user?.role === "ADMIN";
  if (!isAdmin) {
    return Response.redirect(new URL("/error/auth", req.url));
  }
});

export const config = {
  matcher: [
    "/players/add",
    "/matches/add",
    "/matches/:id/edit",
    "/players/:id/edit",
    "/admin",
  ],
};
