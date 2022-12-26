import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { socketMiddleware } from "./middleware/socket-middleware";
import { rootReducer } from "./reducers/rootReducer";
import {
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
} from "./actions/wsActions";

const wsUrlApi = "wss://norma.nomoreparties.space/orders";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  wsClose: WS_CONNECTION_CLOSE,
  onError: WS_CONNECTION_ERROR,
  onClosed: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_MESSAGE,
};

export const store = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, socketMiddleware(wsUrlApi, wsActions))
    )
  );
