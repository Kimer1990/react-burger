import { combineReducers } from "redux";
import { allIngredientsReducer } from "./allIngredientsReducer";
import { orderIngredientsReducer } from "./orderIngredientsReducer";
import { orderReducer } from "./orderReducer";
import { userReducer } from "./userReducer";
import { recoverPassReducer } from "./recoverPassReducer";
import { resetPassReducer } from "./resetPassReducer";
import { registerReducer } from "./registerReducer";
import { feedWsReducer } from "./feedWsReducer";
import { profileWsReducer } from "./profileWsReducer";

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  orderIngredients: orderIngredientsReducer,
  order: orderReducer,
  user: userReducer,
  recoverPass: recoverPassReducer,
  resetPass: resetPassReducer,
  register: registerReducer,
  feedWs: feedWsReducer,
  profileWs: profileWsReducer,
});
