import {Component, OnDestroy, OnInit} from '@angular/core';
import {CREATE, INGREDIENT_PRICES, MENUS, MYRECIPE, SEARCH, SURPRISE} from "@app-shared/constants";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth/auth.service";
import {Observable, Subscription} from "rxjs";
import {User} from "@app-shared/models/user.model";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, OnDestroy{

  subscriptions: Subscription[] = []
  userDataObs!: Observable<User>;
  imageUrl!: string;

  constructor( private router: Router,
               public authService: AuthService){
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

  onClickGoToPrices() {
    this.router.navigateByUrl(INGREDIENT_PRICES).then();
  }

  onClickLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
