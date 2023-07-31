import AxiosCLient from "@/lib/axiosClient";

export async function getAllStores() {
  return await AxiosCLient.fetchingWithData("get", "/store/get-all-stores/");
}

export async function getStoreProductStatus(data) {
  return await AxiosCLient.fetchingWithData("post", "/store/profit", data);
}

export async function getStoreTotalProfitAndQuantityByStatus(data) {
  return await AxiosCLient.fetchingWithData("post", "/store/totalprofit", data);
}

export async function getStoreAndProduct(param) {
  return await AxiosCLient.fetchingWithData("get", "/store/id=" + param);
}
