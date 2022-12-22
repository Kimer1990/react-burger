import { postData, saveTokens } from "../../utils/burger-api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const register = (form) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await postData("auth/register", form);
    if (response.success) {
      const { refreshToken, accessToken } = response;

      dispatch({ type: REGISTER_SUCCESS });
      saveTokens(refreshToken, accessToken);
    } else {
      dispatch({ type: REGISTER_FAILED });
      alert(`Ошибка регистрации. ${response.message}`);
    }
  } catch (error) {
    dispatch({ type: REGISTER_FAILED });
    console.error(error);
    alert(`Ошибка регистрации. ${error.message}`);
  }
};
