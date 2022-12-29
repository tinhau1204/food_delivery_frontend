import AxiosCLient from "@/lib/axiosClient";

export async function getHistory(url) {
  return await AxiosCLient.fetchingWithData("get", url);
}

export async function createOrder(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}
