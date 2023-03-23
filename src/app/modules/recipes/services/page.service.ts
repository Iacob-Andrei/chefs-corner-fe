import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient,
              private api: ApiService) { }

  getRecipeById(page: number, type: string) {
    return this.api.getRecipesForPage(page, type);
  }
}
