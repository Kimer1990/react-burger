import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../actions/orderActions";

const initialState = {
  orderNum: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
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
