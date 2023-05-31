import { Injectable } from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private api: ApiService) { }

  getMenus() {
    return this.api.getMenus();
  }

  getMenuById(id: number) {
    return this.api.getMenuById(id);
  }

  postMenu(name: string, description: string) {
    return this.api.postMenu(name, description);
  }

  addRecipeToMenu(idMenu: any, idRecipe: any, category: any){
    return this.api.addRecipeToMenu(idMenu, idRecipe, category)
  }
}
