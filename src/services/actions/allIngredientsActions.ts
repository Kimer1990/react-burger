import { getData } from "../../utils/burger-api";
import { AppDispatch } from "../types";
import { TIngredientItem } from "../types/data";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

export const INCREASE_INGREDIENTS_AMOUNT: "INCREASE_INGREDIENTS_AMOUNT" =
  "INCREASE_INGREDIENTS_AMOUNT";
export const DECREASE_INGREDIENTS_AMOUNT: "DECREASE_INGREDIENTS_AMOUNT" =
  "DECREASE_INGREDIENTS_AMOUNT";
export const RESSET_BUNS_AMOUNT: "RESSET_BUNS_AMOUNT" = "RESSET_BUNS_AMOUNT";
export const RESSET_FILLINGS_AMOUNT: "RESSET_FILLINGS_AMOUNT" =
  "RESSET_FILLINGS_AMOUNT";

export type TGetIngredientRequest = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type TGetIngredientSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: Array<TIngredientItem>;
};

export type TGetIngredientFailed = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TIncreaseIngredientsAmount = {
  readonly type: typeof INCREASE_INGREDIENTS_AMOUNT;
  _id?: string;
};

export type TDecreaseIngredientsAmount = {
  readonly type: typeof DECREASE_INGREDIENTS_AMOUNT;
  _id?: string;
};

export type TRessetBunAmount = {
  readonly type: typeof RESSET_BUNS_AMOUNT;
};

export type TRessetFillingsAmount = {
  readonly type: typeof RESSET_FILLINGS_AMOUNT;
};

export type TIngredientsActions =
  | TGetIngredientRequest
  | TGetIngredientSuccess
  | TGetIngredientFailed
  | TIncreaseIngredientsAmount
  | TDecreaseIngredientsAmount
  | TRessetBunAmount
  | TRessetFillingsAmount;

export function getIngredientRequest() {
  return { type: GET_INGREDIENTS_REQUEST };
}

export function getIngredientSuccess(data: Array<TIngredientItem>) {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    data: data.map((ingredient) => ({ ...ingredient, qnt: 0 })),
  };
}

export function getIngredientFailed() {
  return { type: GET_INGREDIENTS_FAILED };
}

export function increaseIngredientsAmount(ingredient: TIngredientItem) {
  return {
    type: INCREASE_INGREDIENTS_AMOUNT,
    _id: ingredient._id,
  };
}

export function decreaseIngredientsAmount(item: TIngredientItem) {
  return {
    type: DECREASE_INGREDIENTS_AMOUNT,
    _id: item._id,
  };
}

export function ressetBunAmount() {
  return { type: RESSET_BUNS_AMOUNT };
}

export function ressetFillingsAmount() {
  return { type: RESSET_FILLINGS_AMOUNT };
}

export const fetchIngredients = () => async (dispatch: AppDispatch) => {
  dispatch(getIngredientRequest());
  try {
    const { success, data } = await getData("ingredients");
    if (success) {
      dispatch(getIngredientSuccess(data));
    } else {
      dispatch(getIngredientFailed());
      alert("Не удалось получить список ингридиентов :(");
    }
  } catch (error: any) {
    dispatch(getIngredientFailed());
    console.error(error);
    alert(`Не удалось получить список ингридиентов. ${error.message}`);
  }
};
