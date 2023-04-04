import {Direction} from "./direction.model";
import {IngredientUsed} from "./ingredientused.model";
import {Category} from "./category.model";

export interface Recipe {
  id: number;
  name: string;
  image: string;
  prep_time?: number;
  cook_time?: number;
  number_servings?: number;
  directions?: Direction[];
  ingredients?: IngredientUsed[];
  categories?: Category[]
}
