import axios from "../../utils/axios";

export const googleAuthCode = (authCode: { code: string }) => {
  return axios.post("/api/v1/auth/google", authCode, {
    withCredentials: true,
  });
};
