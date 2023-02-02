import {
  PROFILE_WS_CONNECTION_ERROR,
  PROFILE_WS_GET_MESSAGE,
  PROFILE_WS_CONNECTION_SUCCESS,
  PROFILE_WS_CONNECTION_CLOSED,
  PROFILE_WS_CONNECTION_START,
} from "../actions/profileWsActions";

const initialState = {
  orders: [],
  isCreated: false,
  isOpen: false,
  total: 0,
  totalToday: 0,
  error: null,
};

export const profileWsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_WS_CONNECTION_START:
      return { ...state, isCreated: true };

    case PROFILE_WS_CONNECTION_SUCCESS:
      return { ...state, isOpen: true, error: null };

    case PROFILE_WS_CONNECTION_ERROR:
      return { ...state, error: action.error };

    case PROFILE_WS_GET_MESSAGE:
      const { total, totalToday, orders } = JSON.parse(action.payload);
      return {
        ...state,
        total,
        totalToday,
        orders: orders.sort(function (a, b) {
          if (a.number > b.number) {
            return -1;
          }
          if (a.number < b.number) {
            return 1;
          }
          return 0;
        }),
      };

    case PROFILE_WS_CONNECTION_CLOSED:
      return { ...state, isOpen: false, isCreated: false, orders: [] };

    default:
      return state;
  }
};
