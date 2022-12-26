import { getOrderByNumber } from "../../utils/burger-api";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export function GetOrderRequest() {
  return { type: GET_ORDER_REQUEST };
}

export function GetOrderSuccess(item) {
  return { type: GET_ORDER_SUCCESS, payload: item };
}

export function GetOrderFailed() {
  return { type: GET_ORDER_FAILED };
}

export const getOrder = (number) => async (dispatch) => {
  dispatch(GetOrderRequest());
  try {
    const { success, orders } = await getOrderByNumber(`orders/${number}`);
    if (success) {
      const status = orders[0].status === "done" ? "Выполнен" : "Готовится";
      const statusClass = orders[0].status === "done" ? "font-ready" : "";
      dispatch(
        GetOrderSuccess({
          ...orders[0],
          status,
          statusClass,
        })
      );
    } else {
      dispatch(GetOrderFailed());
      alert(`Не удалось получить информацию по заказу №${number}`);
    }
  } catch (error) {
    dispatch(GetOrderFailed());
    console.error(error);
    alert(
      `Не удалось получить информацию по заказу №${number}. ${error.message}`
    );
  }
};
