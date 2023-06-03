import {Injectable} from '@angular/core';
import {LoaderService} from "./loader.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {finalize, Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(public loaderService: LoaderService,
              private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.token) {
      req = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${this.authService.token}`)
        }
      )
    }

    this.loaderService.isLoading.next(true);

    return next.handle(req).pipe(
      finalize(
        () => {

          setTimeout( () => {
            this.loaderService.isLoading.next(false);
          });
        }
      )
    )
  }

}
