import AxiosCLient from "@/lib/axiosClient";

export async function assignUser(url, data) {
  console.log("data", data);
  return await AxiosCLient.fetchingWithData("post", url, data);
}
