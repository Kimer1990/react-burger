import { combineReducers } from "redux";
import { allIngredientsReducer } from "./allIngredientsReducer";
import { orderIngredientsReducer } from "./orderIngredientsReducer";
import { currentIngredientReducer } from "./currentIngredientReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  orderIngredients: orderIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});
