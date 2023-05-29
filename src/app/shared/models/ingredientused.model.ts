import {IngredientPrice} from "@app-shared/models/ingredientprice.model";

export interface IngredientUsed{
  id: number;
  name: string;
  price_per_unit: number;
  image: string;
  svg: string;
  amount: number;
  description: string;
  unit: string;
  grams: number;
  prices: IngredientPrice[];
}
