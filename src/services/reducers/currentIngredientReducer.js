import {
  CLEAR_INGREDIENT,
  SET_INGREDIENT,
} from "../actions/currentIngredientActions";

const initialState = {};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT:
      return { ...state, ...action.item };
    case CLEAR_INGREDIENT:
      return {};
    default:
      return state;
  }
};
