import AxiosCLient from "@/lib/axiosClient";

export async function getStoreAndProduct(url) {
  return await AxiosCLient.fetchingWithData("get", url);
}
