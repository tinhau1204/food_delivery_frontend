import AxiosCLient from "@/lib/axiosClient";

export async function getAllProducts() {
  return await AxiosCLient.fetchingWithData("get", "/menu/get-all-products");
}

export async function getAllProductsType(data) {
  return await AxiosCLient.fetchingWithData(
    "get",
    "/menu/get-all-product-type/" + data,
  );
}

export async function getProductType(data) {
  return await AxiosCLient.fetchingWithData(
    "get",
    "/menu/get-product-type/" + data,
  );
}

export async function editProductType(data) {
  return await AxiosCLient.fetchingWithData(
    "post",
    "/menu/edit-product-type",
    data,
  );
}

export async function createProduct(data) {
  return await AxiosCLient.fetchingWithData("post", "menu/new-product", data);
}

export async function createProductType(data) {
  return await AxiosCLient.fetchingWithData(
    "post",
    "/menu/new-product-type",
    data,
  );
}

export async function editProduct(data) {
  return await AxiosCLient.fetchingWithData("post", "/menu/edit-product", data);
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

export async function getProductDetailById(data) {
  return await AxiosCLient.fetchingWithData("get", "/menu/product/" + data);
}

export async function getProductById(data) {
  return await AxiosCLient.fetchingWithData("get", "/menu/get-product/" + data);
}

export async function getRandomProducts(data) {
  return await AxiosCLient.fetchingWithData(
    "post",
    "/menu/random-products",
    data,
  );
}
