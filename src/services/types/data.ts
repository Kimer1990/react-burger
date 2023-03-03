export const BUN: string = "bun";
export const SAUCE: string = "sauce";
export const MAIN: string = "main";

export type TTab = {
  id: typeof BUN | typeof SAUCE | typeof MAIN;
  name: string;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
};

export type TUserState = {
  loginRequest: boolean;
  loginFailed: boolean;
  loginSuccess: boolean;
  isAuthChecked: boolean;
  userInfo: TUser;
};

export type TIngredientItem = {
  id?: string;
  _id: string;
  name: string;
  image: string;
  price: number;
  qnt: number;
  type?: string;
  calories?: number;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  unicId?: string;
};

export type TAllIngredientsInfo = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsList: Array<TIngredientItem>;
  ingredientTabs: Array<TTab>;
};

export type TIngredient = {
  ingredient: TIngredientItem;
};

export type TOrdersListItem = {
  _id: string;
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  statusClass: string;
  ingredients: Array<string>;
};

export type TOrdersList = {
  orders: Array<TOrdersListItem>;
  isCreated: boolean;
  isOpen?: boolean;
  total: number;
  totalToday: number;
  error?: unknown;
};

export type TOrderIngredients = {
  bun: TIngredientItem | null;
  fillings: Array<TIngredientItem>;
  orderSum: number | null;
};

export type TOrder = {
  orderNum: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

export type TRecoverPass = {
  recoverPassRequest: boolean;
  recoverPassSuccess: boolean;
  recoverPassFailed: boolean;
};

export type TRegister = {
  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailed: boolean;
};

export type TResetPassword = {
  resetPassRequest: boolean;
  resetPassSuccess: boolean;
  resetPassFailed: boolean;
};
