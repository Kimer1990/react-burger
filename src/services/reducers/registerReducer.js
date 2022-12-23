import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../actions/registerActions";

const initialState = {
  registerRequest: false,
  registerSuccess: false,
  registerFailed: false,
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, registerRequest: true };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerRequest: false,
        registerSuccess: true,
        registerFailed: false,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
        registerSuccess: false,
      };
    default:
      return state;
  }
};
