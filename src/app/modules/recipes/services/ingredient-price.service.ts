import { Injectable } from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class IngredientPriceService {

  constructor(private api: ApiService) { }

  patchIngredientPrice(id: any, seller: any, price: any){
    return this.api.patchIngredientPrice(id, seller, price);
  }

  deleteIngredientPrice(id: any){
    return this.api.deleteIngredientPrice(id);
  }
}
