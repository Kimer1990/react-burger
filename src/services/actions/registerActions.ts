import { postData, saveTokens } from "../../utils/burger-api";
import { AppDispatch } from "../types";

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_FAILED: "REGISTER_FAILED" = "REGISTER_FAILED";

type TData = { name: string; email: string; password: string };

export type TRegisterRequest = {
  readonly type: typeof REGISTER_REQUEST;
};

export type TRegisterSuccess = {
  readonly type: typeof REGISTER_SUCCESS;
};

export type TRegisterFailed = {
  readonly type: typeof REGISTER_FAILED;
};

export type TRegisterActions =
  | TRegisterRequest
  | TRegisterSuccess
  | TRegisterFailed;

export function registerRequest() {
  return { type: REGISTER_REQUEST };
}

export function registerSuccess() {
  return { type: REGISTER_SUCCESS };
}

export function registerFailed() {
  return { type: REGISTER_FAILED };
}

export const register = (form: TData) => async (dispatch: AppDispatch) => {
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
  } catch (error: any) {
    dispatch(registerFailed());
    console.error(error);
    alert(`Ошибка регистрации. ${error.message}`);
  }
};
