import {Direction} from "./direction.model";
import {IngredientUsed} from "./ingredientused.model";

export interface Recipe {
  id: number;
  name: string;
  image: string;
  prep_time?: number;
  cook_time?: number;
  number_servings?: number;
  file?: Blob | string;
  owner?: string;
  directions?: Direction[];
  ingredients?: IngredientUsed[];
  categories?: string[]
}
