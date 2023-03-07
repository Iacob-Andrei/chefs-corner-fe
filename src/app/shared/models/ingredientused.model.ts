import {Ingredient} from "./ingredient.model";

export interface IngredientUsed{
  id: number;
  ingredient: Ingredient;
  amount: number;
  description: string;
  unit: string;
  grams: number;
}
