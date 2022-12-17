import { ingredientTypes } from "../../utils/constant";
import nextId from "react-id-generator";

import {
  INCREASE_INGREDIENTS_AMOUNT,
  DECREASE_INGREDIENTS_AMOUNT,
  RESSET_BUNS_AMOUNT,
} from "./allIngredientsActions";

export const ADD_INGREDIENT_TO_ORDER = "ADD_INGREDIENT_TO_ORDER";
export const DEL_INGREDIENT_FROM_ORDER = "DEL_INGREDIENT_FROM_ORDER";
export const UPDATE_INGREDIENTS_ORDER = "UPDATE_INGREDIENTS_ORDER";

const { BUN } = ingredientTypes;

export const addIngredient = (ingredient) => (dispatch) => {
  if (ingredient.type === BUN) {
    dispatch({
      type: RESSET_BUNS_AMOUNT,
    });
  }

  dispatch({
    type: ADD_INGREDIENT_TO_ORDER,
    item: {
      ...ingredient,
      unicId: nextId(),
    },
  });

  dispatch({
    type: INCREASE_INGREDIENTS_AMOUNT,
    _id: ingredient._id,
  });
};

export const delIngredient = (item) => (dispatch) => {
  dispatch({
    type: DEL_INGREDIENT_FROM_ORDER,
    item,
  });
  dispatch({
    type: DECREASE_INGREDIENTS_AMOUNT,
    _id: item._id,
  });
};
