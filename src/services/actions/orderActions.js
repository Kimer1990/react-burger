import { postData } from "../../utils/burger-api";
import { cleanIngredientOrder } from "./orderIngredientsActions";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export function getOrderRequest() {
  return { type: GET_ORDER_REQUEST };
}

export function getOrderSuccess(order) {
  return {
    type: GET_ORDER_SUCCESS,
    orderNum: order.number,
  };
}

export function getOrderFailed() {
  return { type: GET_ORDER_FAILED };
}

export const makeOrder = (data) => async (dispatch) => {
  dispatch(getOrderRequest());
  try {
    const { success, order } = await postData("orders", data);
    if (success) {
      dispatch(getOrderSuccess(order));
      dispatch(cleanIngredientOrder());
    } else {
      dispatch(getOrderFailed());
      alert("Не удалось оформить заказ :(");
    }
  } catch (error) {
    dispatch(getOrderFailed());
    console.error(error);
    alert(`Не удалось оформить заказ. ${error.message}`);
  }
};
