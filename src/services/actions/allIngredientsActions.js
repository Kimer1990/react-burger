import { getData } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const INCREASE_INGREDIENTS_AMOUNT = "INCREASE_INGREDIENTS_AMOUNT";
export const DECREASE_INGREDIENTS_AMOUNT = "DECREASE_INGREDIENTS_AMOUNT";
export const RESSET_BUNS_AMOUNT = "RESSET_BUNS_AMOUNT";

export const fetchIngredients = () => async (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  try {
    const { success, data } = await getData("ingredients");
    if (success) {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        data: data.map((ingredient) => ({ ...ingredient, qnt: 0 })),
      });
    } else {
      dispatch({ type: GET_INGREDIENTS_FAILED });
      alert("Не удалось получить список ингридиентов :(");
    }
  } catch (error) {
    dispatch({ type: GET_INGREDIENTS_FAILED });
    console.error(error);
    alert(`Не удалось получить список ингридиентов. ${error.message}`);
  }
};
