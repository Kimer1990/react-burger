export const PROFILE_WS_CONNECTION_START = "PROFILE_WS_CONNECTION_START";
export const PROFILE_WS_CONNECTION_SUCCESS = "PROFILE_WS_CONNECTION_SUCCESS";
export const PROFILE_WS_CONNECTION_CLOSED = "PROFILE_WS_CONNECTION_CLOSED";
export const PROFILE_WS_CONNECTION_ERROR = "PROFILE_WS_CONNECTION_ERROR";
export const PROFILE_WS_CONNECTION_CLOSE = "PROFILE_WS_CONNECTION_CLOSE";
export const PROFILE_WS_GET_MESSAGE = "PROFILE_WS_GET_MESSAGE";

export const profileWsConnectionStart = (url) => {
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

export const profileWsConnectionError = (error) => {
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

export const profileWsGetMessage = (data) => {
  return {
    type: PROFILE_WS_GET_MESSAGE,
    payload: data,
  };
};
