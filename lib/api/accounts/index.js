import AxiosCLient from "@/lib/axiosClient";

export async function accountLogin(data) {
  return await AxiosCLient.fetchingWithData("post", "/account/login", data);
}

export async function accountRegister(data) {
  return await AxiosCLient.fetchingWithData("post", "/account/register", data);
}
