import { Injectable } from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class IngredientPriceService {

  constructor(private api: ApiService) { }

  getIngredientPrices(){
    return this.api.getIngredientPrices();
  }

  postIngredientPrice(seller: any, price: any, idIngredient: any){
    return this.api.postIngredientPrice(seller, price, idIngredient)
  }

  patchIngredientPrice(id: any, seller: any, price: any){
    return this.api.patchIngredientPrice(id, seller, price);
  }

  deleteIngredientPrice(id: any){
    return this.api.deleteIngredientPrice(id);
  }
}
