import { getData } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const INCREASE_INGREDIENTS_AMOUNT = "INCREASE_INGREDIENTS_AMOUNT";
export const DECREASE_INGREDIENTS_AMOUNT = "DECREASE_INGREDIENTS_AMOUNT";
export const RESSET_BUNS_AMOUNT = "RESSET_BUNS_AMOUNT";
export const RESSET_FILLINGS_AMOUNT = "RESSET_FILLINGS_AMOUNT";

export function getIngredientRequest() {
  return { type: GET_INGREDIENTS_REQUEST };
}

export function getIngredientSuccess(data) {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    data: data.map((ingredient) => ({ ...ingredient, qnt: 0 })),
  };
}

export function getIngredientFailed() {
  return { type: GET_INGREDIENTS_FAILED };
}

export function increaseIngredientsAmount(ingredient) {
  return {
    type: INCREASE_INGREDIENTS_AMOUNT,
    _id: ingredient._id,
  };
}

export function decreaseIngredientsAmount(item) {
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

export const fetchIngredients = () => async (dispatch) => {
  dispatch(getIngredientRequest());
  try {
    const { success, data } = await getData("ingredients");
    if (success) {
      dispatch(getIngredientSuccess(data));
    } else {
      dispatch(getIngredientFailed());
      alert("Не удалось получить список ингридиентов :(");
    }
  } catch (error) {
    dispatch(getIngredientFailed());
    console.error(error);
    alert(`Не удалось получить список ингридиентов. ${error.message}`);
  }
};
