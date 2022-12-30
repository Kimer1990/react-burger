import {
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_GET_MESSAGE,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_CONNECTION_START,
} from "../actions/feedWsActions";

const initialState = {
  orders: [],
  isCreated: false,
  isOpen: false,
  total: 0,
  totalToday: 0,
  error: null,
};

export const feedWsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_WS_CONNECTION_START:
      return { ...state, isCreated: true };

    case FEED_WS_CONNECTION_SUCCESS:
      return { ...state, isOpen: true, error: null };

    case FEED_WS_CONNECTION_ERROR:
      return { ...state, error: action.error };

    case FEED_WS_GET_MESSAGE:
      const { total, totalToday, orders } = JSON.parse(action.payload);
      return {
        ...state,
        total,
        totalToday,
        orders: orders,
      };

    case FEED_WS_CONNECTION_CLOSED:
      return { ...state, isOpen: false, isCreated: false, orders: [] };

    default:
      return state;
  }
};
