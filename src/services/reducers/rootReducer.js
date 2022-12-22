import { combineReducers } from "redux";
import { allIngredientsReducer } from "./allIngredientsReducer";
import { orderIngredientsReducer } from "./orderIngredientsReducer";
import { currentIngredientReducer } from "./currentIngredientReducer";
import { orderReducer } from "./orderReducer";
import { userReducer } from "./userReducer";
import { recoverPassReducer } from "./recoverPassReducer";
import { resetPassReducer } from "./resetPassReducer";
import { registerReducer } from "./registerReducer";

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  orderIngredients: orderIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  user: userReducer,
  recoverPass: recoverPassReducer,
  resetPass: resetPassReducer,
  register: registerReducer,
});
