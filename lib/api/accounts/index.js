import AxiosCLient from "@/lib/axiosClient";

export async function accountLogin(data) {
  return await AxiosCLient.fetchingWithData("post", "/account/login", data);
}

export async function accountRegister(data) {
  return await AxiosCLient.fetchingWithData("post", "/account/register", data);
}

export async function accountInfoGetWithId(data) {
  return await AxiosCLient.fetchingWithData(
    "get",
    "/account/get-information/" + data,
  );
}

export async function accountChangePassword(data) {
  return await AxiosCLient.fetchingWithData(
    "post",
    "/account/change-password/",
    data,
  );
}
