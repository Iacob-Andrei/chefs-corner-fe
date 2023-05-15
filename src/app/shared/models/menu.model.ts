import {Recipe} from "@app-shared/models/recipe.model";

export interface Menu{
  id: number,
  name: string,
  description: String,
  recipes: Recipes
}

interface Recipes {
  [category: string]: Recipe[];
}
