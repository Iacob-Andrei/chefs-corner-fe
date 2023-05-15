import { Injectable } from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  addPermission(id: number, email: string) {
    return this.api.addPermission(id, email);
  }

  getCurrentPermission(id: number){
    return this.api.getCurrentPermission(id);
  }

  removePermission(idRecipe: number, email: string) {
    return this.api.removePermission(idRecipe, email);
  }
}
