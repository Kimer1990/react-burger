import { ingredientTypes } from "../../utils/constant";
import nextId from "react-id-generator";

import {
  increaseIngredientsAmount,
  decreaseIngredientsAmount,
  ressetBunAmount,
} from "./allIngredientsActions";

export const ADD_INGREDIENT_TO_ORDER = "ADD_INGREDIENT_TO_ORDER";
export const DEL_INGREDIENT_FROM_ORDER = "DEL_INGREDIENT_FROM_ORDER";
export const UPDATE_INGREDIENTS_ORDER = "UPDATE_INGREDIENTS_ORDER";

const { BUN } = ingredientTypes;

export function addIngredientToOrder(ingredient) {
  return {
    type: ADD_INGREDIENT_TO_ORDER,
    item: {
      ...ingredient,
      unicId: nextId(),
    },
  };
}

export function delIngredientFromOrder(item) {
  return {
    type: DEL_INGREDIENT_FROM_ORDER,
    item,
  };
}

export function updateIngredientOrder(fillings) {
  return { type: UPDATE_INGREDIENTS_ORDER, fillings: fillings };
}

export const addIngredient = (ingredient) => (dispatch) => {
  if (ingredient.type === BUN) {
    dispatch(ressetBunAmount());
  }

  dispatch(addIngredientToOrder(ingredient));
  dispatch(increaseIngredientsAmount(ingredient));
};

export const delIngredient = (item) => (dispatch) => {
  dispatch(delIngredientFromOrder(item));
  dispatch(decreaseIngredientsAmount(item));
};
