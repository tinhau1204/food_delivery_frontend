import AxiosCLient from "@/lib/axiosClient";

export async function getAllStores() {
  return await AxiosCLient.fetchingWithData("get", "/store/get-all-stores/");
}

export async function getStoreAndProduct(param) {
  return await AxiosCLient.fetchingWithData("get", "/store/id=" + param);
}
