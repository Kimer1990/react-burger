import { postData } from "../../utils/burger-api";

export const RECOVER_PASS_REQUEST = "RECOVER_PASS_REQUEST";
export const RECOVER_PASS_SUCCESS = "RECOVER_PASS_SUCCESS";
export const RECOVER_PASS_FAILED = "RECOVER_PASS_FAILED";

export function recoverPassRequest() {
  return { type: RECOVER_PASS_REQUEST };
}

export function recoverPassSuccess() {
  return { type: RECOVER_PASS_SUCCESS };
}

export function recoverPassFailed() {
  return { type: RECOVER_PASS_FAILED };
}

export const recoverPass = (data) => async (dispatch) => {
  dispatch(recoverPassRequest());
  try {
    const response = await postData("password-reset", data);
    if (response.success) {
      dispatch(recoverPassSuccess());
    } else {
      dispatch(recoverPassFailed());
      alert(`Не удалось востановить пароль. ${response.message}`);
    }
  } catch (error) {
    dispatch(recoverPassFailed());
    console.error(error);
    alert(`Не удалось востановить пароль. ${error.message}`);
  }
};
