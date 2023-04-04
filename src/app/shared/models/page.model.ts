import {Recipe} from "./recipe.model";

export interface Page{
  currentPage: number;
  totalPages: number;
  recipes: Recipe[];
}
