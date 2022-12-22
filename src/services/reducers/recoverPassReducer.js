import {
  RECOVER_PASS_FAILED,
  RECOVER_PASS_REQUEST,
  RECOVER_PASS_SUCCESS,
} from "../actions/recoverPassActions";

const initialState = {
  recoverPassRequest: false,
  recoverPassSuccess: false,
  recoverPassFailed: false,
};

export const recoverPassReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECOVER_PASS_REQUEST:
      return { ...state, recoverPassRequest: true };
    case RECOVER_PASS_SUCCESS:
      return {
        ...state,
        recoverPassRequest: false,
        recoverPassSuccess: true,
        recoverPassFailed: false,
      };
    case RECOVER_PASS_FAILED:
      return {
        ...state,
        recoverPassRequest: false,
        recoverPassFailed: true,
        recoverPassSuccess: false,
      };
    default:
      return state;
  }
};
