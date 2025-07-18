import axios from "axios";

export const googleAuthCode = (authCode: { code: string }) => {
  return axios.post("http://localhost:8000/api/v1/auth/google", authCode, {
    withCredentials: true,
  });
};
