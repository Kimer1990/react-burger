export const FEED_WS_CONNECTION_START = "FEED_WS_CONNECTION_START";
export const FEED_WS_CONNECTION_SUCCESS = "FEED_WS_CONNECTION_SUCCESS";
export const FEED_WS_CONNECTION_CLOSED = "FEED_WS_CONNECTION_CLOSED";
export const FEED_WS_CONNECTION_ERROR = "FEED_WS_CONNECTION_ERROR";
export const FEED_WS_CONNECTION_CLOSE = "FEED_WS_CONNECTION_CLOSE";
export const FEED_WS_GET_MESSAGE = "FEED_WS_GET_MESSAGE";

export const feedWsConnectionStart = (url) => {
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

export const feedWsConnectionError = (error) => {
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

export const feedWsGetMessage = (data) => {
  return {
    type: FEED_WS_GET_MESSAGE,
    payload: data,
  };
};
