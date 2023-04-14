import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ApiService} from "../../../services/api.service";
import {RecipePost} from "../../../shared/models/recipePost.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient,
              private api: ApiService) { }

  getRecipeById(id: string) {
    return this.api.getRecipeById(id);
  }

  postRecipe(recipe: RecipePost){
    return this.api.postRecipe(recipe);
  }
}
