import { postData } from "../../utils/burger-api";
import { AppDispatch } from "../types";

export const RECOVER_PASS_REQUEST: "RECOVER_PASS_REQUEST" =
  "RECOVER_PASS_REQUEST";
export const RECOVER_PASS_SUCCESS: "RECOVER_PASS_SUCCESS" =
  "RECOVER_PASS_SUCCESS";
export const RECOVER_PASS_FAILED: "RECOVER_PASS_FAILED" = "RECOVER_PASS_FAILED";

type TData = { email: string };

export type TRecoverPassRequest = {
  readonly type: typeof RECOVER_PASS_REQUEST;
};

export type TRecoverPassSuccess = {
  readonly type: typeof RECOVER_PASS_SUCCESS;
};

export type TRecoverPassFailed = {
  readonly type: typeof RECOVER_PASS_FAILED;
};

export type TRecoverPassActions =
  | TRecoverPassRequest
  | TRecoverPassSuccess
  | TRecoverPassFailed;

export function recoverPassRequest() {
  return { type: RECOVER_PASS_REQUEST };
}

export function recoverPassSuccess() {
  return { type: RECOVER_PASS_SUCCESS };
}

export function recoverPassFailed() {
  return { type: RECOVER_PASS_FAILED };
}

export const recoverPass = (data: TData) => async (dispatch: AppDispatch) => {
  dispatch(recoverPassRequest());
  try {
    const response = await postData("password-reset", data);
    if (response.success) {
      dispatch(recoverPassSuccess());
    } else {
      dispatch(recoverPassFailed());
      alert(`Не удалось востановить пароль. ${response.message}`);
    }
  } catch (error: any) {
    dispatch(recoverPassFailed());
    console.error(error);
    alert(`Не удалось востановить пароль. ${error.message}`);
  }
};
