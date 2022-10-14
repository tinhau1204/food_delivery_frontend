import { API } from "@/config/env";

const axiosConfig = {
  baseURL: API,
  timeout: 5000,
  headers: {
    "content-type": "application/json",
  },
  params: {},
};

export default axiosConfig;
