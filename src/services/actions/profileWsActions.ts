export const PROFILE_WS_CONNECTION_START: "PROFILE_WS_CONNECTION_START" =
  "PROFILE_WS_CONNECTION_START";
export const PROFILE_WS_CONNECTION_SUCCESS: "PROFILE_WS_CONNECTION_SUCCESS" =
  "PROFILE_WS_CONNECTION_SUCCESS";
export const PROFILE_WS_CONNECTION_CLOSED: "PROFILE_WS_CONNECTION_CLOSED" =
  "PROFILE_WS_CONNECTION_CLOSED";
export const PROFILE_WS_CONNECTION_ERROR: "PROFILE_WS_CONNECTION_ERROR" =
  "PROFILE_WS_CONNECTION_ERROR";
export const PROFILE_WS_CONNECTION_CLOSE: "PROFILE_WS_CONNECTION_CLOSE" =
  "PROFILE_WS_CONNECTION_CLOSE";
export const PROFILE_WS_GET_MESSAGE: "PROFILE_WS_GET_MESSAGE" =
  "PROFILE_WS_GET_MESSAGE";

export type TProfileWsConnectionStart = {
  readonly type: typeof PROFILE_WS_CONNECTION_START;
  wsUrl: string;
};

export type TProfileWsConnectionSuccess = {
  readonly type: typeof PROFILE_WS_CONNECTION_SUCCESS;
};

export type TProfileWsConnectionError = {
  readonly type: typeof PROFILE_WS_CONNECTION_ERROR;
  error: string;
};

export type TProfileWsConnectionClosed = {
  readonly type: typeof PROFILE_WS_CONNECTION_CLOSED;
};

export type TProfileWsConnectionClose = {
  readonly type: typeof PROFILE_WS_CONNECTION_CLOSE;
};

export type TProfileWsGetMessage = {
  readonly type: typeof PROFILE_WS_GET_MESSAGE;
  payload: string;
};

export type TProfileWsActions =
  | TProfileWsConnectionStart
  | TProfileWsConnectionSuccess
  | TProfileWsConnectionError
  | TProfileWsConnectionClosed
  | TProfileWsConnectionClose
  | TProfileWsGetMessage;

export const profileWsConnectionStart = (url: string) => {
  return {
    type: PROFILE_WS_CONNECTION_START,
    wsUrl: url,
  };
};

export const profileWsConnectionSuccess = () => {
  return {
    type: PROFILE_WS_CONNECTION_SUCCESS,
  };
};

export const profileWsConnectionError = (error: string) => {
  return {
    type: PROFILE_WS_CONNECTION_ERROR,
    payload: error,
  };
};

export const profileWsConnectionClosed = () => {
  return {
    type: PROFILE_WS_CONNECTION_CLOSED,
  };
};

export const profileWsConnectionClose = () => {
  return {
    type: PROFILE_WS_CONNECTION_CLOSE,
  };
};

export const profileWsGetMessage = (data: string) => {
  return {
    type: PROFILE_WS_GET_MESSAGE,
    payload: data,
  };
};
