import { ingredientTypes } from "../../utils/constant";
import {
  ADD_INGREDIENT_TO_ORDER,
  DEL_INGREDIENT_FROM_ORDER,
  UPDATE_INGREDIENTS_ORDER,
} from "../actions/orderIngredientsActions";

const { BUN } = ingredientTypes;

const initialState = {
  bun: {},
  fillings: [],
};

export const orderIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_ORDER:
      if (action.item.type === BUN) {
        return { ...state, bun: action.item };
      }
      return { ...state, fillings: [...state.fillings, action.item] };

    case DEL_INGREDIENT_FROM_ORDER:
      return {
        ...state,
        fillings: [
          ...state.fillings.filter(
            (item) => item.unicId !== action.item.unicId
          ),
        ],
      };

    case UPDATE_INGREDIENTS_ORDER:
      return {
        ...state,
        fillings: action.fillings,
      };
    default:
      return state;
  }
};
