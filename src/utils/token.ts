import { jwtDecode } from "jwt-decode";

export interface TokenPayload {
  userId: string;
  email: string;
  roleId: string;
  unique_name?: string;
  nbf?: number;
  exp?: number;
  iat?: number;
  iss?: string;
  aud?: string;
}


export function getTokenPayload(): TokenPayload | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return jwtDecode<TokenPayload>(token);
}

export function getRoleId(): number | null {
  const payload = getTokenPayload();
  return payload ? parseInt(payload.roleId) : null;
}

export function getUserId(): number | null {
  const payload = getTokenPayload();
  return payload ? parseInt(payload.userId) : null;
}

export function getRedirectPathByRole(): string {
  const roleId = getRoleId();
  switch (roleId) {
    case 1:
      return "/auth/superadmin";
    case 2:
      return "/auth/admin";
    case 3:
      return "/auth/user";
    default:
      return "/";
  }
}
