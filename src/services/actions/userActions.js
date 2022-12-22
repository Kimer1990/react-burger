import { getDataWithToken, postData, saveTokens } from "../../utils/burger-api";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const TOGGLE_USER_AUTH_CHECKED = "TOGGLE_USER_AUTH_CHECKED";

export const getUser = (data) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await postData("auth/login", data);
    if (response.success) {
      const { refreshToken, accessToken, user } = response;

      dispatch({ type: GET_USER_SUCCESS, payload: user });
      saveTokens(refreshToken, accessToken);
    } else {
      dispatch({ type: GET_USER_FAILED });
      alert(`Ошибка авторизации. ${response.message}`);
    }
  } catch (error) {
    dispatch({ type: GET_USER_FAILED });
    console.error(error);
    alert(`Ошибка авторизации. ${error.message}`);
  }
};

export const getUserWithToken = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await getDataWithToken("auth/user");
    if (response.success) {
      dispatch({ type: GET_USER_SUCCESS, payload: response.user });
    } else {
      dispatch({ type: GET_USER_FAILED });
    }
  } catch (error) {
    dispatch({ type: GET_USER_FAILED });
  }
};
