import AxiosCLient from "@/lib/axiosClient";

export async function getProductDetail(url) {
  //console.log("data", data);
  return await AxiosCLient.fetchingWithData("get", url);
}
