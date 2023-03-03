export const FEED_WS_CONNECTION_START: "FEED_WS_CONNECTION_START" =
  "FEED_WS_CONNECTION_START";
export const FEED_WS_CONNECTION_SUCCESS: "FEED_WS_CONNECTION_SUCCESS" =
  "FEED_WS_CONNECTION_SUCCESS";
export const FEED_WS_CONNECTION_CLOSED: "FEED_WS_CONNECTION_CLOSED" =
  "FEED_WS_CONNECTION_CLOSED";
export const FEED_WS_CONNECTION_ERROR: "FEED_WS_CONNECTION_ERROR" =
  "FEED_WS_CONNECTION_ERROR";
export const FEED_WS_CONNECTION_CLOSE: "FEED_WS_CONNECTION_CLOSE" =
  "FEED_WS_CONNECTION_CLOSE";
export const FEED_WS_GET_MESSAGE: "FEED_WS_GET_MESSAGE" = "FEED_WS_GET_MESSAGE";

export type TFeedWsConnectionStart = {
  readonly type: typeof FEED_WS_CONNECTION_START;
  wsUrl: string;
};

export type TFeedWsConnectionSuccess = {
  readonly type: typeof FEED_WS_CONNECTION_SUCCESS;
};

export type TFeedWsConnectionError = {
  readonly type: typeof FEED_WS_CONNECTION_ERROR;
  error: string;
};

export type TFeedWsConnectionClosed = {
  readonly type: typeof FEED_WS_CONNECTION_CLOSED;
};

export type TFeedWsConnectionClose = {
  readonly type: typeof FEED_WS_CONNECTION_CLOSE;
};

export type TFeedWsGetMessage = {
  readonly type: typeof FEED_WS_GET_MESSAGE;
  payload: string;
};

export type TFeedWsActions =
  | TFeedWsConnectionStart
  | TFeedWsConnectionSuccess
  | TFeedWsConnectionError
  | TFeedWsConnectionClosed
  | TFeedWsConnectionClose
  | TFeedWsGetMessage;

export const feedWsConnectionStart = (url: string) => {
  return {
    type: FEED_WS_CONNECTION_START,
    wsUrl: url,
  };
};

export const feedWsConnectionSuccess = () => {
  return {
    type: FEED_WS_CONNECTION_SUCCESS,
  };
};

export const feedWsConnectionError = (error: string) => {
  return {
    type: FEED_WS_CONNECTION_ERROR,
    payload: error,
  };
};

export const feedWsConnectionClosed = () => {
  return {
    type: FEED_WS_CONNECTION_CLOSED,
  };
};

export const feedWsConnectionClose = () => {
  return {
    type: FEED_WS_CONNECTION_CLOSE,
  };
};

export const feedWsGetMessage = (data: string) => {
  return {
    type: FEED_WS_GET_MESSAGE,
    payload: data,
  };
};
