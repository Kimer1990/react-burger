import nextId from "react-id-generator";
import { AppDispatch } from "../types";
import { BUN, TIngredientItem } from "../types/data";

import {
  increaseIngredientsAmount,
  decreaseIngredientsAmount,
  ressetBunAmount,
} from "./allIngredientsActions";

export const ADD_INGREDIENT_TO_ORDER: "ADD_INGREDIENT_TO_ORDER" =
  "ADD_INGREDIENT_TO_ORDER";
export const DEL_INGREDIENT_FROM_ORDER: "DEL_INGREDIENT_FROM_ORDER" =
  "DEL_INGREDIENT_FROM_ORDER";
export const UPDATE_INGREDIENTS_ORDER: "UPDATE_INGREDIENTS_ORDER" =
  "UPDATE_INGREDIENTS_ORDER";
export const CLEAN_INGREDIENTS_ORDER: "CLEAN_INGREDIENTS_ORDER" =
  "CLEAN_INGREDIENTS_ORDER";

export type TAddIngredientToOrder = {
  readonly type: typeof ADD_INGREDIENT_TO_ORDER;
  item: TIngredientItem;
};

export type TDelIngredientFromOrder = {
  readonly type: typeof DEL_INGREDIENT_FROM_ORDER;
  item: TIngredientItem;
};

export type TUpdateIngredientsOrder = {
  readonly type: typeof UPDATE_INGREDIENTS_ORDER;
  fillings: Array<TIngredientItem>;
};

export type TCleanIngredientsOrder = {
  readonly type: typeof CLEAN_INGREDIENTS_ORDER;
};

export type TOrderIngredientsActions =
  | TAddIngredientToOrder
  | TDelIngredientFromOrder
  | TUpdateIngredientsOrder
  | TCleanIngredientsOrder;

export function addIngredientToOrder(ingredient: TIngredientItem) {
  return {
    type: ADD_INGREDIENT_TO_ORDER,
    item: {
      ...ingredient,
      unicId: nextId(),
    },
  };
}

export function delIngredientFromOrder(item: TIngredientItem) {
  return {
    type: DEL_INGREDIENT_FROM_ORDER,
    item,
  };
}

export function updateIngredientOrder(fillings: Array<TIngredientItem>) {
  return { type: UPDATE_INGREDIENTS_ORDER, fillings: fillings };
}

export function cleanIngredientOrder() {
  return { type: CLEAN_INGREDIENTS_ORDER };
}

export const addIngredient =
  (ingredient: TIngredientItem) => (dispatch: AppDispatch) => {
    if (ingredient.type === BUN) {
      dispatch(ressetBunAmount());
    }

    dispatch(addIngredientToOrder(ingredient));
    dispatch(increaseIngredientsAmount(ingredient));
  };

export const delIngredient =
  (item: TIngredientItem) => (dispatch: AppDispatch) => {
    dispatch(delIngredientFromOrder(item));
    dispatch(decreaseIngredientsAmount(item));
  };
