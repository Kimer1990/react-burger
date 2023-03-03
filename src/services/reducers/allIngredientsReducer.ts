import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENTS_AMOUNT,
  DECREASE_INGREDIENTS_AMOUNT,
  RESSET_BUNS_AMOUNT,
  RESSET_FILLINGS_AMOUNT,
  TIngredientsActions,
} from "../actions/allIngredientsActions";
import { BUN, MAIN, SAUCE, TAllIngredientsInfo } from "../types/data";

const initialState: TAllIngredientsInfo = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsList: [],
  ingredientTabs: [
    { id: BUN, name: "Булки" },
    { id: SAUCE, name: "Соусы" },
    { id: MAIN, name: "Начинки" },
  ],
};

export const allIngredientsReducer = (
  state = initialState,
  action: TIngredientsActions
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, ingredientsRequest: true };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsList: action.data,
        ingredientsRequest: false,
      };

    case GET_INGREDIENTS_FAILED:
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };

    case INCREASE_INGREDIENTS_AMOUNT:
      return {
        ...state,
        ingredientsList: state.ingredientsList.map((item) => {
          if (item._id === action._id) {
            item.qnt = item.type === BUN ? 2 : item.qnt + 1;
          }
          return item;
        }),
      };

    case DECREASE_INGREDIENTS_AMOUNT:
      return {
        ...state,
        ingredientsList: state.ingredientsList.map((item) => {
          if (item._id === action._id) {
            item.qnt = item.qnt - 1;
          }
          return item;
        }),
      };

    case RESSET_BUNS_AMOUNT:
      return {
        ...state,
        ingredientsList: state.ingredientsList.map((item) => {
          if (item.type === BUN) {
            item.qnt = 0;
          }
          return item;
        }),
      };

    case RESSET_FILLINGS_AMOUNT:
      return {
        ...state,
        ingredientsList: state.ingredientsList.map((item) => {
          if (item.type !== BUN) {
            item.qnt = 0;
          }
          return item;
        }),
      };

    default:
      return state;
  }
};
