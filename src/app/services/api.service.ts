import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Recipe} from "../shared/models";
import {environment} from "../../environments/environment";
import {Page} from "../shared/models/page.model";
import {User} from "../shared/models/user.model";
import {RecipePost} from "../shared/models/recipePost.model";
import {Menu} from "@app-shared/models/menu.model";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiServerUrl = environment.apiBaseUrl;
  private _OPTIONS = {'headers': { 'content-type': 'application/json'}};

  constructor(private http: HttpClient,
              private toasterService: ToastrService) { }

  private handleErrorForToaster(
    message: string = 'Oops, something went wrong.',
    title: string = 'Error')
  {
    return catchError((httpErr) => {
      if(message === 'Oops, something went wrong.')
        message = httpErr.error ? httpErr.error['message'] : message;

      this.toasterService.error(message, title);
      return of(null);
    });
  }

  // ---- RECIPE ----
  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiServerUrl}/api/recipe/${id}`)
      .pipe();
  }

  getRecipesForPage(page: number, type: string): Observable<Page>{
    return this.http.get<Page>(`${this.apiServerUrl}/api/category/${type},${page}`)
      .pipe();
  }

  getMyRecipes() {
    return this.http.get<Recipe[]>(`${this.apiServerUrl}/api/recipe/for-user`)
      .pipe();
  }

  getRecipesByIds(ids: number[]) {
    const body: string = JSON.stringify(ids);
    return this.http.post<any>(`${this.apiServerUrl}/api/recipe/list`, body, this._OPTIONS);
  }

  getRecipesByFilter(pattern: string) {
    return this.http.get<Recipe[]>(`${this.apiServerUrl}/api/recipe/name/${pattern}`)
      .pipe();
  }

  getIngredientsByFilter(pattern: string) {
    return this.http.get<Recipe[]>(`${this.apiServerUrl}/api/ingredient/${pattern}`)
      .pipe();
  }

  getUsersByFilter(pattern: string) {
    return this.http.get<string[]>(`${this.apiServerUrl}/api/user/data/${pattern}`)
  }

  postRecipe(recipe: RecipePost) {
    const body: string = JSON.stringify(recipe)
    return this.http.post(`${this.apiServerUrl}/api/recipe`, body);
  }

  patchRecipeImage(idRecipe: number, image: File) {
    const fd: FormData = new FormData();
    fd.append('image', image);

    return this.http.patch(`${this.apiServerUrl}/api/recipe/image/${idRecipe}`, fd)
  }

  uploadVideoRecipe(idRecipe: number, orderDirection: number, video: File) {
    const fd: FormData = new FormData();
    fd.append('video', video);

    return this.http.patch(`${this.apiServerUrl}/api/direction/video/${idRecipe},${orderDirection}`, fd)
  }

  deleteRecipe(idRecipe: number) {
    return this.http.delete(`${this.apiServerUrl}/api/recipe/${idRecipe}`);
  }

  // ---- AUTHENTICATE + USER ----

  login(email: string, password: string) {
    const body: string = JSON.stringify({"email": email, "password":password});
    return this.http.post<any>(`${this.apiServerUrl}/api/auth/token`, body)
      .pipe(this.handleErrorForToaster("Invalid credentials!"));
  }

  register(name: string, email: string, password: string, business: boolean){
    const body: string = JSON.stringify({"name": name, "email": email, "password":password, "business": business})
    return this.http.post(`${this.apiServerUrl}/api/auth/register`, body, this._OPTIONS)
      .pipe(this.handleErrorForToaster());
  }

  patchImage(email: string, image: File){
    const fd = new FormData();
    fd.append('image', image);
    return this.http.patch(`${this.apiServerUrl}/api/user/${email}/image`, fd)
      .pipe(this.handleErrorForToaster());
  }

  getUsedInfo(email: string) {
    return this.http.get<User>(`${this.apiServerUrl}/api/user/${email}`);
  }

  // ---- RECIPES PERMISSIONS ----

  addPermission(id: number, email: string) {
    const body: string = JSON.stringify({"email": email, "idRecipe":id});
    return this.http.post<any>(`${this.apiServerUrl}/api/permission/add`, body);
  }

  getCurrentPermission(id: number) {
    return this.http.get<string[]>(`${this.apiServerUrl}/api/permission/${id}`)
  }

  removePermission(idRecipe: number, email: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        email: email,
        idRecipe: idRecipe,
      },
    };

    return this.http.delete(`${this.apiServerUrl}/api/permission/remove`,options);
  }

  // ---- MENU ----

  getMenus() {
    return this.http.get<any>(`${this.apiServerUrl}/api/menu/owned`);
  }

  getMenuById(id: number) {
    return this.http.get<Menu>(`${this.apiServerUrl}/api/menu/${id}`);
  }

  getRecipesForMenu(currentMenu: any, requested: any) {
    const body: string = JSON.stringify({currentMenu: currentMenu, requested: requested});
    return this.http.post<any>(`${this.apiServerUrl}/api/category/complete-menu`, body, this._OPTIONS);
  }

  postMenu(name: string, description: string, currentMenu: any) {
    const body: string = JSON.stringify({name: name, description: description, currentMenu: currentMenu});
    return this.http.post<any>(`${this.apiServerUrl}/api/menu`, body, this._OPTIONS);
  }
}
