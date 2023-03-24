import AxiosCLient from "@/lib/axiosClient";

export async function getAllProducts() {
  return await AxiosCLient.fetchingWithData("get", "/menu/get-all-products");
}

export async function cancelOrder(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}

export async function searchProduct(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}
