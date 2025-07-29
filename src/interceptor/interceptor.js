import axios from "axios";

export const AxiosInterceptor = axios.create({
  baseURL: "https://booking-app-db.vercel.app",
});
