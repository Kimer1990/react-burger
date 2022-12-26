import {
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../actions/wsActions";

const initialState = {
  orders: [],
  isCreated: false,
  isOpen: false,
  total: 0,
  totalToday: 0,
  error: null,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return { ...state, isCreated: true };

    case WS_CONNECTION_SUCCESS:
      return { ...state, isOpen: true, error: null };

    case WS_CONNECTION_ERROR:
      return { ...state, error: action.error };

    case WS_GET_MESSAGE:
      const { total, totalToday, orders } = JSON.parse(action.payload);
      return {
        ...state,
        total,
        totalToday,
        orders: [...state.orders, ...orders],
      };

    case WS_CONNECTION_CLOSED:
      return { ...state, isOpen: false, isCreated: false, orders: [] };

    default:
      return state;
  }
};
