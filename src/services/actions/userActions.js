import { getDataWithToken, postData, saveTokens } from "../../utils/burger-api";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const TOGGLE_USER_AUTH_CHECKED = "TOGGLE_USER_AUTH_CHECKED";

export function getUserRequest() {
  return { type: GET_USER_REQUEST };
}

export function getUserSuccess(user) {
  return { type: GET_USER_SUCCESS, payload: user };
}

export function getUserFailed() {
  return { type: GET_USER_FAILED };
}

export function toggleUserAuthChecked() {
  return { type: TOGGLE_USER_AUTH_CHECKED };
}

export const getUser = (data) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await postData("auth/login", data);
    if (response.success) {
      const { refreshToken, accessToken, user } = response;

      dispatch(getUserSuccess(user));
      saveTokens(refreshToken, accessToken);
    } else {
      dispatch(getUserFailed());
      alert(`Ошибка авторизации. ${response.message}`);
    }
  } catch (error) {
    dispatch(getUserFailed());
    console.error(error);
    alert(`Ошибка авторизации. ${error.message}`);
  }
};

export const getUserWithToken = () => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await getDataWithToken("auth/user");
    if (response.success) {
      dispatch(getUserSuccess(response.user));
    } else {
      dispatch(getUserFailed());
    }
  } catch (error) {
    dispatch(getUserFailed());
  }
};
