import AxiosCLient from "@/lib/axiosClient";

export async function getAllProducts() {
  return await AxiosCLient.fetchingWithData("get", "/menu/get-all-products");
}

export async function cancelOrder(data) {
  return await AxiosCLient.fetchingWithData(
    "post",
    "order/status-change",
    data,
  );
}

export async function searchProduct(data) {
  return await AxiosCLient.fetchingWithData("post", "/menu/search", data);
}

export async function getProductDetailById(id) {
  return await AxiosCLient.fetchingWithData("get", "/menu/product/" + id);
}

export async function getRandomProducts(data) {
  return await AxiosCLient.fetchingWithData(
    "post",
    "/menu/random-products",
    data,
  );
}
