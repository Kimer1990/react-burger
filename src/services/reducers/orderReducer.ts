import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  TOrderActions,
} from "../actions/orderActions";
import { TOrder } from "../types/data";

const initialState: TOrder = {
  orderNum: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
        orderNum: null,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderNum: action.orderNum,
        orderRequest: false,
      };
    case GET_ORDER_FAILED:
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
      };
    default:
      return state;
  }
};
