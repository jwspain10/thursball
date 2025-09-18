import { ROLES } from "@/constants";

interface SessionUser {
  role: string;
}

interface Session {
  user: SessionUser;
}

interface AuthRole {
  isUser: boolean;
  isAdmin: boolean;
}

export const getAuthRole = (session: Session | null): AuthRole => {
  let isUser = false;
  let isAdmin = false;

  if (!session) {
    return { isUser, isAdmin };
  }
  if (session.user.role === ROLES.ADMIN) {
    isUser = true;
    isAdmin = true;
  }
  if (session.user.role === ROLES.USER) {
    isUser = true;
  }

  return { isUser, isAdmin };
};
