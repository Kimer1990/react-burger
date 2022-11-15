import { postOrder } from "../../utils/burger-api";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const makeOrder = (data) => async (dispatch) => {
  dispatch({ type: GET_ORDER_REQUEST });
  try {
    const { success, order } = await postOrder({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: data }),
    });
    if (success) {
      dispatch({
        type: GET_ORDER_SUCCESS,
        orderNum: order.number,
      });
    } else {
      dispatch({ type: GET_ORDER_FAILED });
      alert("Не удалось оформить заказ :(");
    }
  } catch (error) {
    dispatch({ type: GET_ORDER_FAILED });
    console.error(error);
    alert(`Не удалось оформить заказ. ${error.message}`);
  }
};
