import AxiosCLient from "@/lib/axiosClient";

export async function getBotData(url, data) {
  return await AxiosCLient.fetchingWithData("get", url);
}
