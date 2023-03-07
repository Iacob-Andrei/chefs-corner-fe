import {Direction} from "./direction.model";
import {IngredientUsed} from "./ingredientused.model";

export interface Recipe {
  id: number;
  name: string;
  prep_time: number;
  cook_time: number;
  number_servings: number;
  image: string;
  directions: [Direction]
  ingredients: [IngredientUsed]
}
