import AxiosCLient from "@/lib/axiosClient";

export async function getAllProducts(url) {
  return await AxiosCLient.fetchingWithData("get", url);
}

export async function cancelOrder(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}

export async function searchProduct(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}
