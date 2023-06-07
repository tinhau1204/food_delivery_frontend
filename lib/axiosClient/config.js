import { API } from "@/config/env";

const axiosConfig = {
  baseURL: API,
  timeout: 5000,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
  params: {},
};

export default axiosConfig;
