import AxiosCLient from "@/lib/axiosClient";

export async function getProductDetail(url) {
  return await AxiosCLient.fetchingWithData("get", url);
}
