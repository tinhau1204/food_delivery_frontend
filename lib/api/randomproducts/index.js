import AxiosCLient from "@/lib/axiosClient";

export async function getRandomProducts(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}
