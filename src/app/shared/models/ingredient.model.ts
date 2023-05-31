import {IngredientPrice} from "@app-shared/models/ingredientprice.model";

export interface Ingredient {
  id: number,
  name: string,
  amount?: number,
  unit?: string,
  grams?: number,
  description?: string
  prices?: IngredientPrice[];
}
