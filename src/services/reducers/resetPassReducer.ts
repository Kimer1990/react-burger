import {
  RESET_PASS_FAILED,
  RESET_PASS_REQUEST,
  RESET_PASS_SUCCESS,
  TResetPassActions,
} from "../actions/resetPassActions";
import { TResetPassword } from "../types/data";

const initialState: TResetPassword = {
  resetPassRequest: false,
  resetPassSuccess: false,
  resetPassFailed: false,
};

export const resetPassReducer = (
  state = initialState,
  action: TResetPassActions
) => {
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
