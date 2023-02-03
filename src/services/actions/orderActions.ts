import { postData } from "../../utils/burger-api";
import { cleanIngredientOrder } from "./orderIngredientsActions";
import { ressetBunAmount, ressetFillingsAmount } from "./allIngredientsActions";
import { AppDispatch } from "../types";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

export type TGetOrderRequest = {
  readonly type: typeof GET_ORDER_REQUEST;
};

export type TGetOrderSuccess = {
  readonly type: typeof GET_ORDER_SUCCESS;
  orderNum: number;
};

export type TGetOrderFailed = {
  readonly type: typeof GET_ORDER_FAILED;
};

export type TOrderActions =
  | TGetOrderRequest
  | TGetOrderSuccess
  | TGetOrderFailed;

export function getOrderRequest() {
  return { type: GET_ORDER_REQUEST };
}

export function getOrderSuccess(number: number) {
  return {
    type: GET_ORDER_SUCCESS,
    orderNum: number,
  };
}

export function getOrderFailed() {
  return { type: GET_ORDER_FAILED };
}

export const makeOrder =
  (data: { ingredients: (string | undefined)[] }) =>
  async (dispatch: AppDispatch) => {
    dispatch(getOrderRequest());
    try {
      const {
        success,
        order: { number },
      } = await postData("orders", data);
      if (success) {
        dispatch(getOrderSuccess(number));
        dispatch(cleanIngredientOrder());
        dispatch(ressetBunAmount());
        dispatch(ressetFillingsAmount());
      } else {
        dispatch(getOrderFailed());
        alert("Не удалось оформить заказ :(");
      }
    } catch (error: any) {
      dispatch(getOrderFailed());
      console.error(error);
      alert(`Не удалось оформить заказ. ${error.message}`);
    }
  };
