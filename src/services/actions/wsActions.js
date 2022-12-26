export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSE = "WS_CONNECTION_CLOSE";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";

export const wsConnectionStart = (url) => {
  return {
    type: WS_CONNECTION_START,
    wsUrl: url,
  };
};

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (error) => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: error,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsConnectionClose = () => {
  return {
    type: WS_CONNECTION_CLOSE,
  };
};

export const wsGetMessage = (data) => {
  return {
    type: WS_GET_MESSAGE,
    payload: data,
  };
};
