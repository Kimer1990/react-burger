import { postData } from "../../utils/burger-api";

export const RESET_PASS_REQUEST = "RESET_PASS_REQUEST";
export const RESET_PASS_SUCCESS = "RESET_PASS_SUCCESS";
export const RESET_PASS_FAILED = "RESET_PASS_FAILED";

export const resetPass = (data) => async (dispatch) => {
  dispatch({ type: RESET_PASS_REQUEST });
  try {
    const response = await postData("password-reset/reset", data);
    if (response.success) {
      dispatch({ type: RESET_PASS_SUCCESS, data: response });
    } else {
      dispatch({ type: RESET_PASS_FAILED });
      alert(`Не удалось сбросить пароль. ${response.message}`);
    }
  } catch (error) {
    dispatch({ type: RESET_PASS_FAILED });
    console.error(error);
    alert(`Не удалось сбросить пароль. ${error.message}`);
  }
};
