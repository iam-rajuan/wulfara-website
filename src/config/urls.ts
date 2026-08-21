const defaultBackendOrigin = process.env.NODE_ENV !== "production" ? "http://localhost:5000" : "";
const defaultDashboardOrigin = process.env.NODE_ENV !== "production" ? "http://localhost:5173" : "";

const backendOrigin = (
  process.env.NEXT_PUBLIC_BACKEND_URL || defaultBackendOrigin
).replace(/\/+$/, "");
const dashboardOrigin = (
  process.env.NEXT_PUBLIC_DASHBOARD_URL || defaultDashboardOrigin
).replace(/\/+$/, "");

export const API_BASE_URL = backendOrigin ? `${backendOrigin}/api/v1` : "/api/v1";
export const SOCKET_BASE_URL = backendOrigin;
export const DASHBOARD_SIGN_IN_URL = dashboardOrigin ? `${dashboardOrigin}/sign-in` : "/login";
export const SUPPLIER_ONBOARDING_URL = dashboardOrigin
  ? `${dashboardOrigin}/sign-up?intent=supplier-onboarding`
  : "/signup";
