import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { socketMiddleware } from "./middleware/socket-middleware";
import { rootReducer } from "./reducers/rootReducer";
import {
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_GET_MESSAGE,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_CLOSE,
} from "./actions/feedWsActions";
import {
  PROFILE_WS_CONNECTION_ERROR,
  PROFILE_WS_GET_MESSAGE,
  PROFILE_WS_CONNECTION_SUCCESS,
  PROFILE_WS_CONNECTION_CLOSED,
  PROFILE_WS_CONNECTION_START,
  PROFILE_WS_CONNECTION_CLOSE,
} from "./actions/profileWsActions";

const wsUrlApi = "wss://norma.nomoreparties.space/orders";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const feedWsActions = {
  wsInit: FEED_WS_CONNECTION_START,
  onOpen: FEED_WS_CONNECTION_SUCCESS,
  wsClose: FEED_WS_CONNECTION_CLOSE,
  onError: FEED_WS_CONNECTION_ERROR,
  onClosed: FEED_WS_CONNECTION_CLOSED,
  onMessage: FEED_WS_GET_MESSAGE,
};

const profileWsActions = {
  wsInit: PROFILE_WS_CONNECTION_START,
  onOpen: PROFILE_WS_CONNECTION_SUCCESS,
  wsClose: PROFILE_WS_CONNECTION_CLOSE,
  onError: PROFILE_WS_CONNECTION_ERROR,
  onClosed: PROFILE_WS_CONNECTION_CLOSED,
  onMessage: PROFILE_WS_GET_MESSAGE,
};

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
    socketMiddleware(wsUrlApi, feedWsActions),
    socketMiddleware(wsUrlApi, profileWsActions)
  )
);

export const store = createStore(rootReducer, enhancer);
