import { LOAD_REPORTS, LOAD_DASHBOARD_REPORT } from "./constants";

export const loadReports = form => ({ type: LOAD_REPORTS, payload: form });

export const loadDashboardReports = () => ({ type: LOAD_DASHBOARD_REPORT });
