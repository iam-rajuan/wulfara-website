const DEFAULT_BACKEND_ORIGIN = "http://localhost:5000";
const DASHBOARD_ORIGIN = "http://localhost:5173";

const backendOrigin = (
  process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_ORIGIN
).replace(/\/+$/, "");

export const API_BASE_URL = `${backendOrigin}/api/v1`;
export const SOCKET_BASE_URL = backendOrigin;
export const DASHBOARD_SIGN_IN_URL = `${DASHBOARD_ORIGIN}/sign-in`;
