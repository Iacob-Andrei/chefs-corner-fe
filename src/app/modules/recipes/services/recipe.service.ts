import { Injectable } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {RecipePost} from "@app-shared/models/recipePost.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private api: ApiService) { }

  getRecipeById(id: string) {
    return this.api.getRecipeById(id);
  }

  getRecipesByIds(ids: number[]){
    return this.api.getRecipesByIds(ids);
  }

  getRecipesByIngredients(ids: number[]){
    return this.api.getRecipesByIngredients(ids);
  }

  postRecipe(recipe: RecipePost){
    return this.api.postRecipe(recipe);
  }

  patchImage(idRecipe: number, image: File){
    return this.api.patchRecipeImage(idRecipe, image);
  }

  uploadVideoRecipe(idRecipe: number, orderDirection: number, video: File){
    return this.api.uploadVideoRecipe(idRecipe, orderDirection, video);
  }

  deleteRecipe(idRecipe: number) {
    return this.api.deleteRecipe(idRecipe);
  }

  getRecipesForMenu(idMenu:any, requested: any) {
    return this.api.getRecipesForMenu(idMenu, requested);
  }

  getCurrencyData(){
    return this.api.getCurrencyData();
  }
}
