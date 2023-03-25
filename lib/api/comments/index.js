import AxiosCLient from "@/lib/axiosClient";

export async function insertOrderComment(data) {
  return await AxiosCLient.fetchingWithData("post", "comment/create", data);
}

export async function updateOrderComment(data) {
  return await AxiosCLient.fetchingWithData("post", "comment/edit", data);
}

export async function checkOrderComment(data) {
  return await AxiosCLient.fetchingWithData("post", "/comment/check", data);
}

export async function getStoreCommments(data) {
  return await AxiosCLient.fetchingWithData("post", "/store/comments", data);
}
