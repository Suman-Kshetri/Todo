import axios from "axios";
// import { handleError } from "./toast";
// import { logout } from "./logout";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
});

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/auth/refreshToken") 
//     ) {
//       originalRequest._retry = true;

//       try {
        
//         await axios.post(
//           `${import.meta.env.VITE_API_URL}/auth/refreshToken`,
//           {},
//           { withCredentials: true }
//         );

        
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
        
//         handleError("Session expired. Please log in again.");
//         logout(); 
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
