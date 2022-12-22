import { postData } from "../../utils/burger-api";

export const RECOVER_PASS_REQUEST = "RECOVER_PASS_REQUEST";
export const RECOVER_PASS_SUCCESS = "RECOVER_PASS_SUCCESS";
export const RECOVER_PASS_FAILED = "RECOVER_PASS_FAILED";

export const recoverPass = (data) => async (dispatch) => {
  dispatch({ type: RECOVER_PASS_REQUEST });
  try {
    const response = await postData("password-reset", data);
    if (response.success) {
      dispatch({ type: RECOVER_PASS_SUCCESS, data: response });
    } else {
      dispatch({ type: RECOVER_PASS_FAILED });
      alert(`Не удалось востановить пароль. ${response.message}`);
    }
  } catch (error) {
    dispatch({ type: RECOVER_PASS_FAILED });
    console.error(error);
    alert(`Не удалось востановить пароль. ${error.message}`);
  }
};
