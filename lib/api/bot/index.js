import AxiosCLient from "@/lib/axiosClient";

export async function getBotData(url, data) {
  //console.log("data", data);
  return await AxiosCLient.fetchingWithData("get", url);
}
