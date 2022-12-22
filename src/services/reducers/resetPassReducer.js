import {
  RESET_PASS_FAILED,
  RESET_PASS_REQUEST,
  RESET_PASS_SUCCESS,
} from "../actions/resetPassActions";

const initialState = {
  resetPassRequest: false,
  resetPassSuccess: false,
  resetPassFailed: false,
};

export const resetPassReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASS_REQUEST:
      return { ...state, resetPassRequest: true };
    case RESET_PASS_SUCCESS:
      return {
        ...state,
        resetPassRequest: false,
        resetPassSuccess: true,
        resetPassFailed: false,
      };
    case RESET_PASS_FAILED:
      return {
        ...state,
        resetPassRequest: false,
        resetPassFailed: true,
        resetPassSuccess: false,
      };
    default:
      return state;
  }
};
