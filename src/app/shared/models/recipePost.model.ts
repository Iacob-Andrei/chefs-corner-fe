import {Direction} from "./direction.model";
import {Ingredient} from "./ingredient.model";

export interface RecipePost{
  name: string,
  prep_time: number,
  cook_time: number,
  number_servings: number,
  owner: string,
  directions: Direction[],
  ingredients: Ingredient[]
}
