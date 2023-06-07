import AxiosCLient from "@/lib/axiosClient";

export function getBotData(url) {
  console.log(url);
  return AxiosCLient.fetching("get", url);
}
