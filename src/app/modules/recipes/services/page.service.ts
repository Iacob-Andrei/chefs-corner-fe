import { Injectable } from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private api: ApiService) { }

  getRecipeById(page: number, type: string) {
    return this.api.getRecipesForPage(page, type);
  }

  getMyRecipes() {
    return this.api.getMyRecipes();
  }
}
