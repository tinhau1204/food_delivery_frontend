import AxiosCLient from "@/lib/axiosClient";

export async function getStoreCommments(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}
