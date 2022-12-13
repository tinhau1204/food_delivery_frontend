import AxiosCLient from "@/lib/axiosClient";

export async function getAllStores(url) {
  return await AxiosCLient.fetchingWithData("get", url);
}
