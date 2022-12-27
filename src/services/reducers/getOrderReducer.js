import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../actions/getOrderActions";

const initialState = {
  orderContent: {},
  orderMakedRequest: false,
  orderMakedFailed: false,
};

export const getOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { ...state, orderMakedRequest: true, orderMakedFailed: false };

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderContent: action.payload,
        orderMakedRequest: false,
      };

    case GET_ORDER_FAILED:
      return { ...state, orderMakedFailed: true, orderMakedRequest: false };

    default:
      return state;
  }
};
