export const ADMIN_COOKIE_NAME = "admin_session";

export function isValidAdminPassword(password: string) {
  const configured = process.env.ADMIN_ACCESS_PASSWORD;
  if (!configured) {
    return false;
  }
  return password === configured;
}
