import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "../shared/models";
import {environment} from "../../environments/environment";
import {Page} from "../shared/models/page.model";
import {User} from "../shared/models/user.model";
import {RecipePost} from "../shared/models/recipePost.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

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

  login(email: string, password: string) {
    const headers = { 'content-type': 'application/json'}
    return this.http.post<any>(`${this.apiServerUrl}/api/auth/token`,
                                  JSON.stringify({"email": email, "password":password}),
                                  {'headers': headers})
      .pipe();
  }

  register(name: string, email: string, password: string, business: boolean){
    const headers = { 'content-type': 'application/json'}
    return this.http.post(
      `${this.apiServerUrl}/api/auth/register`,
      JSON.stringify({"name": name, "email": email, "password":password, "business": business}),
      {'headers': headers}
    )
  }

  patchImage(email: string, image: File){
    const fd = new FormData();
    fd.append('image', image);

    return this.http.patch(`${this.apiServerUrl}/api/user/${email}/image`, fd)
  }

  getUsedInfo(email: string) {
    return this.http.get<User>(`${this.apiServerUrl}/api/user/${email}`).pipe();
  }

  postRecipe(recipe: RecipePost) {
    const headers = { 'content-type': 'application/json'}
    return this.http.post(
      `${this.apiServerUrl}/api/recipe`,
      JSON.stringify(recipe),
      {'headers': headers}
    )
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

  addPermission(id: number, email: string) {
    const headers = { 'content-type': 'application/json'}
    return this.http.post<any>(`${this.apiServerUrl}/api/permission/add`,
      JSON.stringify({"email": email, "idRecipe":id}),
      {'headers': headers})
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

  getRecipesByIds(ids: number[]) {
    const headers = { 'content-type': 'application/json'}
    return this.http.post<any>(`${this.apiServerUrl}/api/recipe/list`,
      JSON.stringify(ids),
      {'headers': headers})
  }

  getRecipesForMenu(currentMenu: any, requested: any) {
    const headers = { 'content-type': 'application/json'}
    return this.http.post<any>(`${this.apiServerUrl}/api/category/complete-menu`,
      JSON.stringify({currentMenu: currentMenu, requested: requested}),
      {'headers': headers})
  }

  getMenus() {
    return this.http.get<any>(`${this.apiServerUrl}/api/menu/owned`);
  }
}
