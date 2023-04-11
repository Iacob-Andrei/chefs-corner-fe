import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../api.service";
import {BehaviorSubject, tap} from "rxjs";
import jwt_decode from "jwt-decode";
import {AuthToken} from "../../shared/models/authToken.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this._isLoggedIn$.asObservable();
  private readonly TOKEN_NAME = 'auth_token';

  get token(): any{
    return localStorage.getItem('auth_token');
  }

  constructor(private http: HttpClient,
              private api: ApiService) {
    this.checkTokenValidate();
    this._isLoggedIn$.next(!!this.token);
  }

  login(email: string, password: string) {
    return this.api.login(email, password).pipe(
      tap((response: any) =>{
        localStorage.setItem(this.TOKEN_NAME, response['token']);
        this._isLoggedIn$.next(true);
      })
    );
  }

  getUserInfo(){
    return this.api.getUsedInfo(this.getSubjectFromToken());
  }

  logout() {
    localStorage.removeItem(this.TOKEN_NAME);
    this._isLoggedIn$.next(false);
    window.location.reload();
  }

  register(name: string, email: string, password: string, business = false){
    return this.api.register(name, email, password, business).pipe(
      tap((response: any) =>{
          localStorage.setItem(this.TOKEN_NAME, response['token']);
          this._isLoggedIn$.next(true);
        })
    )
  }

  patchImage(email: string, image: File){
    return this.api.patchImage(email, image);
  }

  checkTokenValidate(){
    if(this.token !== null) {
      const expirationTime = jwt_decode<AuthToken>(this.token).exp * 1000;
      const currentTime = Date.now();

      if (expirationTime < currentTime) {
        this.logout();
      }
    }
  }

  getSubjectFromToken(): string{
    return jwt_decode<AuthToken>(this.token).sub;
  }
}
