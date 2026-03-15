import axios from "axios";
import { useStore } from "@/store/store";
import { CustomError } from "@/types/custom-error.type";
import { ENV } from "./get-env";

const baseURL = ENV.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

//*** FOR API WITH TOKEN */
export const API = axios.create(options);

API.interceptors.request.use((config) => {
  const accessToken = useStore.getState().accessToken;
  if (accessToken) {
    config.headers["Authorization"] = "Bearer " + accessToken;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    const requestUrl = error.config?.url ?? "";
    const isLoginOrRegister =
      requestUrl.includes("/auth/login") || requestUrl.includes("/auth/register");
    if (status === 401 && !isLoginOrRegister) {
      useStore.getState().clearAuth();
      window.location.href = "/login";
    }
    const customError: CustomError = {
      ...error,
      message: data?.message ?? error.message ?? "Request failed",
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
    };
    return Promise.reject(customError);
  }
);

//*** FOR API DONT NEED TOKEN */
export const PublicAPI = axios.create(options);

PublicAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const data = error.response?.data;
    const customError: CustomError = {
      ...error,
      message: data?.message ?? error.message ?? "Request failed",
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
    };
    return Promise.reject(customError);
  }
);
