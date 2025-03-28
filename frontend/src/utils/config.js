import Axios from "axios";

export const frontendConfig = {
  apiBaseUrl: "http://localhost:3100",
  apiVersion: "v1",
};

export const axiosBaseURL = Axios.create({
  baseURL: `${frontendConfig.apiBaseUrl}/api/${frontendConfig.apiVersion}`,
});

export function getAuthHeader() {
  let accessToken;

  if (typeof window !== "undefined") {
    accessToken = sessionStorage.getItem("access-token");
  }

  if (!accessToken) {
    console.error("Acccess token Not Found - Please login again to solve this");

    return null;
  }

  const header = {
    Authorization: `Bearer ${accessToken}`,
  };

  return header;
}
