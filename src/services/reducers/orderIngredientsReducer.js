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
  orderSum: null,
};

function countSum(fillings, bun) {
  console.log(fillings, bun);
  return fillings.reduce((acc, el) => acc + el.price, 0) + bun.price * 2;
}

export const orderIngredientsReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};
