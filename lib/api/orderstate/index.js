import AxiosCLient from "@/lib/axiosClient";

export async function getOrderReceivedState(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}
