import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor(private http: HttpClient,
              private api: ApiService) { }

  getRecipesByFilter(pattern: string){
    return this.api.getRecipesByFilter(pattern);
  }
}
