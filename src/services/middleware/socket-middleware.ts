import { refreshTokenRequest } from "../../utils/burger-api";
import type { Middleware, MiddlewareAPI } from "redux";
import type { AppDispatch, RootState } from "../types/index";

export const socketMiddleware = (
  wsUrlApi: string,
  wsActions: { [key: string]: any }
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let isConnected: boolean = false;
    let reconnectTimer: number = 0;
    let refreshTokenTimer: number = 0;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, wsUrl } = action;
      const { wsInit, onOpen, wsClose, onError, onClosed, onMessage } =
        wsActions;

      if (type === wsInit && wsUrl) {
        console.log("create socket");
        socket = new WebSocket(`${wsUrlApi}${wsUrl}`);
        dispatch({ type: wsInit });
        isConnected = true;
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
          clearTimeout(refreshTokenTimer);
        };

        socket.onerror = async (error) => {
          if (action.error === "jwt expired") {
            await refreshTokenRequest();
            dispatch({ type: wsInit });
          }
          dispatch({ type: onError, error: error });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: onMessage, payload: data });
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch({ type: onError, error: event.code.toString() });
          }
          dispatch({ type: onClosed });

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: wsInit, payload: wsUrl });
            }, 3000);
          }
        };

        if (type === wsClose) {
          console.log("close socket");
          socket.close();
          clearTimeout(reconnectTimer);
          isConnected = false;
        }
      }

      next(action);
    };
  }) as Middleware;
};
