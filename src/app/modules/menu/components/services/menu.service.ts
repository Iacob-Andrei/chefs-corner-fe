import { Injectable } from '@angular/core';
import {ApiService} from "../../../../services/api.service";

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
}
