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


export function getUserId(): number | null {
  const payload = getTokenPayload();
  return payload ? parseInt(payload.userId) : null;
}
