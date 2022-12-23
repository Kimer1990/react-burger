import { postData } from "../../utils/burger-api";

export const RESET_PASS_REQUEST = "RESET_PASS_REQUEST";
export const RESET_PASS_SUCCESS = "RESET_PASS_SUCCESS";
export const RESET_PASS_FAILED = "RESET_PASS_FAILED";

export function resetPassRequest() {
  return { type: RESET_PASS_REQUEST };
}

export function resetPassSuccess() {
  return { type: RESET_PASS_SUCCESS };
}

export function resetPassFailed() {
  return { type: RESET_PASS_FAILED };
}

export const resetPass = (data) => async (dispatch) => {
  dispatch(resetPassRequest());
  try {
    const response = await postData("password-reset/reset", data);
    if (response.success) {
      dispatch(resetPassSuccess());
    } else {
      dispatch(resetPassFailed());
      alert(`Не удалось сбросить пароль. ${response.message}`);
    }
  } catch (error) {
    dispatch(resetPassFailed());
    console.error(error);
    alert(`Не удалось сбросить пароль. ${error.message}`);
  }
};
