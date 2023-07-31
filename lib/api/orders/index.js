import AxiosCLient from "@/lib/axiosClient";

export async function getHistory(account_id, status_id, currentPage, size) {
  return await AxiosCLient.fetchingWithData(
    "get",
    `/order/get-history?user_id=${account_id}&status_id=${status_id}&page=${currentPage}&size=${size}`,
  );
}

export async function getOrderById(order_id) {
  return await AxiosCLient.fetchingWithData(
    "get",
    "order/get-order/" + order_id,
  );
}

export async function getOrderComment(data) {
  return await AxiosCLient.fetchingWithData(
    "post",
    "/order/get-comment/",
    data,
  );
}

export async function createOrder(data) {
  return await AxiosCLient.fetchingWithData("post", "/order/create", data);
}

export async function getOrderReceivedState(data) {
  return await AxiosCLient.fetchingWithData("post", "order/state/", data);
}

export async function getAllOrdersWithParams(store_id, currentPage, size) {
  return await AxiosCLient.fetchingWithData(
    "post",
    `/order/get-store-orders?store_id=${store_id}&page=${currentPage}&size=${size}`,
  );
}

export async function orderProceeding(data) {
  return await AxiosCLient.fetchingWithData("post", "/order/proceed", data);
}

export async function orderSeenStatusSetSet(data) {
  return await AxiosCLient.fetchingWithData(
    "post",
    "/order/orders-seen-status-set",
    data,
  );
}

export async function getUnseenOrderFromStore(data) {
  return await AxiosCLient.fetchingWithData(
    "post",
    "/order/get-unseen-orders",
    data,
  );
}

export async function getRecentUnseenOrdersFromStore(data) {
  return await AxiosCLient.fetchingWithData(
    "post",
    "/order/get-recent-unseen-orders",
    data,
  );
}
