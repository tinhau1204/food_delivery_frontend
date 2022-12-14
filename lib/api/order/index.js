import AxiosCLient from "@/lib/axiosClient";

export async function getHistory(url) {
  //console.log("data", data);
  return await AxiosCLient.fetchingWithData("get", url);
}

export async function createOrder(url, data) {
  //console.log("data", data);
  return await AxiosCLient.fetchingWithData("post", url, data);
}
