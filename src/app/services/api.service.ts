import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "../shared/models";
import {environment} from "../../environments/environment";
import {Page} from "../shared/models/page.model";
import {User} from "../shared/models/user.model";

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

  getRecipesByFilter(pattern: string) {
    return this.http.get<Recipe[]>(`${this.apiServerUrl}/api/recipe/name/${pattern}`)
      .pipe();
  }

  login(email: string, password: string) {
    const headers = { 'content-type': 'application/json'}
    return this.http.post<any>(`${this.apiServerUrl}/api/auth/token`,
                                  JSON.stringify({"email": email, "password":password}),
                                  {'headers': headers})
      .pipe();
  }

  getUsedInfo(email: string) {
    return this.http.get<User>(`${this.apiServerUrl}/api/user/${email}`).pipe();
  }
}
