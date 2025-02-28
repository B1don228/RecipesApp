import { mealType } from "../types/mealType";
import { createGlobalState } from "./globalState";

type MealsState = {
  cartItems: mealType[];
};

export const useMealsState = createGlobalState<MealsState>("meals", {
  cartItems: JSON.parse(localStorage.getItem("cartItems")!),
});
