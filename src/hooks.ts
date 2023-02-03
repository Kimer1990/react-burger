import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import type { AppThunk, RootState, AppDispatch } from "./services/types/index";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch: () => AppDispatch | AppThunk = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
