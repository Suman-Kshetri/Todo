
import axios from "../../utils/axios";

export const logoutUserAPI = async () => {
  return axios.post("/api/v1/auth/logout");
};

export const getCurrentUser = async () => {
  return axios.get("/api/v1/auth/profile", {
    withCredentials: true, 
    timeout: 5000,
  });
};
export const refreshTokenAPI = async () => {
  return axios.post("/api/v1/auth/refreshToken", {}, {
    withCredentials: true, // Important: sends cookies with refresh token
  });
};