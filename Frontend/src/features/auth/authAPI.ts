
import axios from "../../utils/axios";

export const logoutUserAPI = async () => {
  return axios.post("/api/v1/auth/logout");
};

export const getCurrentUser = async () => {
  return axios.get("/api/v1/auth/profile", {
    withCredentials: true, // important: sends cookies
  });
};