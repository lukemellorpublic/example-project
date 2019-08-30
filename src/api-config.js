let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "************************") {
  // Production
  backendHost = "************************";
} else if (hostname === "*******************************") {
  // Test
  backendHost = "********************";
} else if (hostname === "localhost") {
  // Development
  backendHost = `*********************`;
} else {
  // Local
  backendHost = "http://localhost:8080";
}

export const API_ROOT = backendHost;

