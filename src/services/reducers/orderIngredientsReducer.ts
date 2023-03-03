import {
  ADD_INGREDIENT_TO_ORDER,
  DEL_INGREDIENT_FROM_ORDER,
  UPDATE_INGREDIENTS_ORDER,
  CLEAN_INGREDIENTS_ORDER,
  TOrderIngredientsActions,
} from "../actions/orderIngredientsActions";
import { BUN, TOrderIngredients, TIngredientItem } from "../types/data";

const initialState: TOrderIngredients = {
  bun: null,
  fillings: [],
  orderSum: null,
};

function countSum(
  fillings: Array<TIngredientItem>,
  bun: TIngredientItem | null
) {
  return fillings.reduce((acc, el) => acc + el.price, 0) + bun!.price * 2;
}

export const orderIngredientsReducer = (
  state = initialState,
  action: TOrderIngredientsActions
) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_ORDER:
      if (action.item.type === BUN) {
        const newBun = action.item;
        return {
          ...state,
          bun: newBun,
          orderSum: countSum(state.fillings, newBun),
        };
      }
      const addFillings = [...state.fillings, action.item];
      return {
        ...state,
        fillings: addFillings,
        orderSum: countSum(addFillings, state.bun),
      };

    case DEL_INGREDIENT_FROM_ORDER:
      const delFillings = [
        ...state.fillings.filter((item) => item.unicId !== action.item.unicId),
      ];
      return {
        ...state,
        fillings: delFillings,
        orderSum: countSum(delFillings, state.bun),
      };

    case UPDATE_INGREDIENTS_ORDER:
      return {
        ...state,
        fillings: action.fillings,
      };

    case CLEAN_INGREDIENTS_ORDER:
      return initialState;
    default:
      return state;
  }
};
