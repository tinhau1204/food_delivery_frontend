import AxiosCLient from "@/lib/axiosClient";

export async function getOrderComment(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}

export async function insertComment(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}

export async function updateComment(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}

export async function checkComment(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}
