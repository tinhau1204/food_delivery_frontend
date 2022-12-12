import AxiosCLient from "@/lib/axiosClient";

export async function assignUser(url, data) {
  return await AxiosCLient.fetchingWithData("post", url, data);
}
