import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  TOGGLE_USER_AUTH_CHECKED,
} from "../actions/userActions";

const initialState = {
  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,
  isAuthChecked: false,

  userInfo: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { ...state, loginRequest: true };

    case GET_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loginRequest: false,
        loginSuccess: true,
        loginFailed: false,
      };

    case GET_USER_FAILED:
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
        loginSuccess: false,
        userInfo: null,
      };

    case TOGGLE_USER_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: !state.isAuthChecked,
      };

    default:
      return state;
  }
};
