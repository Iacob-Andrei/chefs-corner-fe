import {Component, OnDestroy, OnInit} from '@angular/core';
import {CART, CREATE, MENUS, MYRECIPE, SEARCH, SURPRISE} from "@app-shared/constants";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth/auth.service";
import {Store} from "@ngrx/store";
import {selectCountRecipes} from "../../../../services/store/cart.selectors";
import {Observable, Subscription} from "rxjs";
import {User} from "@app-shared/models/user.model";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, OnDestroy{

  subscriptions: Subscription[] = []
  countProduct$: Observable<number>;
  userDataObs!: Observable<User>;
  imageUrl!: string;

  constructor( private router: Router,
               public authService: AuthService,
               private store: Store) {
    this.countProduct$ = this.store.select(selectCountRecipes);
  }

  ngOnInit() {
    let auth = undefined;
    const sub = this.authService.isLoggedIn.subscribe(open => auth = open);
    sub.unsubscribe();

    if(auth){
      this.userDataObs = this.authService.getUserInfo();
      this.subscriptions.push(
        this.userDataObs.subscribe(
          response => {
            this.imageUrl = response.image ? `data:image/png;base64,${response.image}` : "./assets/icons/default-profile.jpg";
          }
        )
      )
    }
  }

  onClickGoToRecipes() {
    this.router.navigateByUrl(SEARCH).then();
  }

  onClickGoToCreateRecipe() {
    this.router.navigateByUrl(CREATE).then();
  }

  onClickGoToSurprise() {
    this.router.navigateByUrl(SURPRISE).then();
  }

  onClickGoToMyRecipe() {
    this.router.navigateByUrl(MYRECIPE).then();
  }

  onClickGoToMenuList() {
    this.router.navigateByUrl(MENUS).then();
  }
  onClickGoToCart(){
    this.router.navigateByUrl(CART).then();
  }

  onClickLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
