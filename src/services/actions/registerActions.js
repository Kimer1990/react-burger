import { postData, saveTokens } from "../../utils/burger-api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export function registerRequest() {
  return { type: REGISTER_REQUEST };
}

export function registerSuccess() {
  return { type: REGISTER_SUCCESS };
}

export function registerFailed() {
  return { type: REGISTER_FAILED };
}

export const register = (form) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await postData("auth/register", form);
    if (response.success) {
      const { refreshToken, accessToken } = response;

      dispatch(registerSuccess());
      saveTokens(refreshToken, accessToken);
    } else {
      dispatch(registerFailed());
      alert(`Ошибка регистрации. ${response.message}`);
    }
  } catch (error) {
    dispatch(registerFailed());
    console.error(error);
    alert(`Ошибка регистрации. ${error.message}`);
  }
};
