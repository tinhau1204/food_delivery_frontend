import AxiosCLient from "@/lib/axiosClient";

export async function getOrderComment(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}
