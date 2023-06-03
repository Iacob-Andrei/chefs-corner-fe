import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, take, throwError} from "rxjs";
import {Recipe} from "../shared/models";
import {environment} from "../../environments/environment";
import {RecipePost} from "../shared/models/recipePost.model";
import {Menu} from "@app-shared/models/menu.model";
import {ToastrService} from "ngx-toastr";
import {PAGE_404} from "@app-shared/constants";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private currencyAPI = environment.currencyAPI;
  private apiServerUrl = environment.apiBaseUrl;
  private _OPTIONS = {'headers': { 'content-type': 'application/json'}};

  constructor(private http: HttpClient,
              private toasterService: ToastrService,
              private router: Router) { }

  private handleErrorForToaster(
    message: string = '',
    title: string = 'Error')
  {
    return catchError((httpErr) => {
      if(message === '')
        message = httpErr.error ? httpErr.error : message;

      if(httpErr.status === 404){
        this.router.navigateByUrl(PAGE_404).then();
      }

      this.toasterService.error(message, title);
      return of(null);
    });
  }

  private handleWarningForToaster(
    message: string = '',
    title: string = 'Error')
  {
    return catchError((httpErr) => {
      if(message === '')
        message = httpErr.error ? httpErr.error : message;

      this.toasterService.warning(message, title);
      return of(null);
    });
  }

  private handleErrorRecipe(title: string = 'Error'){
    return catchError((httpErr) => {

      if(httpErr.status === 403){
        return throwError(httpErr);
      }
      else{
        const message = httpErr.error;

        if(httpErr.status === 404){
          this.router.navigateByUrl(PAGE_404).then();
        }

        this.toasterService.error(message, title);
        return of(null);
      }
    })
  }

  // ---- RECIPE ----
  getRecipeById(id: string): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/recipe/${id}`)
      .pipe(
        take(1),
        this.handleErrorRecipe()
      );
  }

  getRecipesForPage(page: number, type: string): Observable<any>{
    return this.http.get(`${this.apiServerUrl}/api/category/${type},${page}`)
      .pipe(take(1), this.handleErrorForToaster());
  }

  getMyRecipes(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/recipe/for-user`)
      .pipe(take(1), this.handleErrorForToaster('Oops, something went wrong.'));
  }

  getRecipesByIds(ids: number[]): Observable<any> {
    const body: string = JSON.stringify(ids);
    return this.http.post(`${this.apiServerUrl}/api/recipe/list`, body, this._OPTIONS)
      .pipe(take(1), this.handleErrorForToaster('Oops, something went wrong.'));
  }

  getRecipesByIngredients(ids: number[]): Observable<any>{
    const body: string = JSON.stringify(ids);
    return this.http.post(`${this.apiServerUrl}/api/recipe/recommendation`, body, this._OPTIONS)
      .pipe(take(1), this.handleErrorForToaster('Oops, something went wrong.'));
  }

  getRecipesByFilter(pattern: string): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/recipe/name/${pattern}`)
      .pipe(take(1), this.handleErrorForToaster('Oops, something went wrong.'));
  }

  getIngredientsByFilter(pattern: string): Observable<any> {
    return this.http.get<Recipe[]>(`${this.apiServerUrl}/api/ingredient/${pattern}`)
      .pipe(take(1), this.handleErrorForToaster('Oops, something went wrong.'));
  }

  getUsersByFilter(pattern: string): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/user/data/${pattern}`)
      .pipe(take(1), this.handleErrorForToaster('Oops, something went wrong.'));
  }

  postRecipe(recipe: RecipePost): Observable<any> {
    const body: string = JSON.stringify(recipe)
    return this.http.post(`${this.apiServerUrl}/api/recipe`, body, this._OPTIONS)
      .pipe(take(1), this.handleWarningForToaster('Invalid arguments.'));
  }

  patchRecipeImage(idRecipe: number, image: File): Observable<any> {
    const fd: FormData = new FormData();
    fd.append('image', image);

    return this.http.patch(`${this.apiServerUrl}/api/file/recipe/${idRecipe}`, fd)
      .pipe(take(1), this.handleWarningForToaster('Error while uploading image. Retry in recipe page.'));
  }

  uploadVideoRecipe(idRecipe: number, orderDirection: number, video: File): Observable<any> {
    const fd: FormData = new FormData();
    fd.append('video', video);

    return this.http.patch(`${this.apiServerUrl}/api/file/video/${idRecipe},${orderDirection}`, fd)
      .pipe(take(1), this.handleWarningForToaster(`Error while uploading video for instruction no. ${orderDirection}. Retry in recipe page.`));
  }

  deleteRecipe(idRecipe: number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/api/recipe/${idRecipe}`)
      .pipe(take(1), this.handleErrorForToaster(`Error while deleting. Recipe not found.`));
  }

  // ---- AUTHENTICATE + USER ----

  login(email: string, password: string): Observable<any> {
    const body: string = JSON.stringify({"email": email, "password":password});
    return this.http.post(`${this.apiServerUrl}/api/auth/token`, body, this._OPTIONS)
      .pipe(take(1), this.handleErrorForToaster("Invalid credentials!"));
  }

  register(name: string, email: string, password: string, business: boolean): Observable<any>{
    const body: string = JSON.stringify({"name": name, "email": email, "password":password, "business": business})
    return this.http.post(`${this.apiServerUrl}/api/auth/register`, body, this._OPTIONS)
      .pipe(take(1), this.handleErrorForToaster());
  }

  patchImage(email: string, image: File): Observable<any>{
    const fd = new FormData();
    fd.append('image', image);
    return this.http.patch(`${this.apiServerUrl}/api/file/profile/${email}`, fd)
      .pipe(take(1), this.handleWarningForToaster("Error while uploading image. Retry in setting panel."));
  }

  getUsedInfo(email: string): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/user`)
      .pipe(take(1), this.handleWarningForToaster("Error while getting user data. Please re-authenticate."));
  }

  // ---- RECIPES PERMISSIONS ----

  addPermission(id: number, email: string): Observable<any> {
    const body: string = JSON.stringify({"email": email, "idRecipe":id});
    return this.http.post(`${this.apiServerUrl}/api/permission/add`, body)
      .pipe(take(1), this.handleWarningForToaster("Oops. Something went wrong!"));
  }

  getCurrentPermission(id: number): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/permission/${id}`)
      .pipe(take(1), this.handleWarningForToaster("Oops. Something went wrong!"));
  }

  removePermission(idRecipe: number, email: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        email: email,
        idRecipe: idRecipe,
      },
    };

    return this.http.delete(`${this.apiServerUrl}/api/permission/remove`,options)
      .pipe(take(1), this.handleWarningForToaster("Oops. Something went wrong!"));
  }

  askPermission(id: number): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/permission/ask/${id}`)
      .pipe(this.handleWarningForToaster());
  }

  confirmPermission(token: string): Observable<any>{
    return this.http.get(`${this.apiServerUrl}/api/permission/confirm?token=${token}`)
      .pipe(take(1), this.handleErrorForToaster());
  }

  deletePermissionRequest(token: string) {
    return this.http.delete(`${this.apiServerUrl}/api/permission/delete?token=${token}`)
      .pipe(take(1), this.handleErrorForToaster())
  }

  getDataPermissionRequest(token: string) {
    return this.http.get(`${this.apiServerUrl}/api/permission/request?token=${token}`)
      .pipe(take(1), this.handleErrorForToaster());
  }

  // ---- MENU ----

  addRecipeToMenu(idMenu: any, idRecipe: any, category: any): Observable<any> {
    const body: string = JSON.stringify({idMenu: idMenu, idRecipe: idRecipe, category: category});
    return this.http.post(`${this.apiServerUrl}/api/menu/add`, body, this._OPTIONS)
      .pipe(take(1), this.handleWarningForToaster("Oops. Something went wrong!"))
  }

  getMenus(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/menu/owned`)
      .pipe(take(1), this.handleWarningForToaster("Oops. Something went wrong!"));
  }

  getMenuById(id: number): Observable<any> {
    return this.http.get<Menu>(`${this.apiServerUrl}/api/menu/${id}`)
      .pipe(take(1), this.handleErrorForToaster());
  }

  getRecipesForMenu(idMenu: any, requested: any): Observable<any> {
    const body: string = JSON.stringify({idMenu: idMenu, requested: requested});
    return this.http.post(`${this.apiServerUrl}/api/category/complete-menu`, body, this._OPTIONS)
      .pipe(take(1), this.handleWarningForToaster("Oops. Something went wrong!"));
  }

  postMenu(name: string, description: string): Observable<any> {
    const body: string = JSON.stringify({name: name, description: description});
    return this.http.post<any>(`${this.apiServerUrl}/api/menu`, body, this._OPTIONS)
      .pipe(take(1), this.handleWarningForToaster("Oops. Something went wrong!"));
  }

  // ---- INGREDIENT PRICE ----

  getIngredientPrices(): Observable<any>{
    return this.http.get(`${this.apiServerUrl}/api/ingredient/list-prices`, this._OPTIONS)
      .pipe(take(1), this.handleWarningForToaster('Oops. Something went wrong.'));
  }

  postIngredientPrice(seller: any, price: any, idIngredient: any): Observable<any> {
    const body: string = JSON.stringify({seller: seller, price: price, idIngredient: idIngredient});

    return this.http.post(`${this.apiServerUrl}/api/ingredient/add-price`, body, this._OPTIONS)
      .pipe(take(1), this.handleWarningForToaster('Oops. Something went wrong.'));
  }

  patchIngredientPrice(id: any, seller: any, price: any): Observable<any> {
    const body: string = JSON.stringify({id: id, seller: seller, price: price});

    return this.http.patch(`${this.apiServerUrl}/api/ingredient/update-price`, body, this._OPTIONS)
      .pipe(take(1), this.handleWarningForToaster('Oops. Something went wrong.'));
  }

  deleteIngredientPrice(id: any): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.delete(`${this.apiServerUrl}/api/ingredient/delete-price/${id}`, options)
      .pipe(take(1), this.handleErrorForToaster());
  }

  // ---- CURRENCY ----

  getCurrencyData():Observable<any> {
    return this.http.get<any>(this.currencyAPI)
  }
}
