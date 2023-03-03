import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { TIngredientsActions } from "../actions/allIngredientsActions";
import { TOrderActions } from "../actions/orderActions";
import { TOrderIngredientsActions } from "../actions/orderIngredientsActions";
import { TRecoverPassActions } from "../actions/recoverPassActions";
import { TRegisterActions } from "../actions/registerActions";
import { TResetPassActions } from "../actions/resetPassActions";
import { TUserActions } from "../actions/userActions";
import { TFeedWsActions } from "../actions/feedWsActions";
import { TProfileWsActions } from "../actions/profileWsActions";

type TApplicationActions =
  | TIngredientsActions
  | TOrderActions
  | TOrderIngredientsActions
  | TRecoverPassActions
  | TRegisterActions
  | TResetPassActions
  | TUserActions
  | TFeedWsActions
  | TProfileWsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
