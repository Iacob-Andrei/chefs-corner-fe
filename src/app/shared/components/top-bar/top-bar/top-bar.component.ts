import {Component, OnDestroy, OnInit} from '@angular/core';
import {AUTH, CREATE, HOME, MYRECIPE, RECIPE, SEARCH} from "../../../constants";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Recipe} from "../../../models";
import {FiltersService} from "../services/filters.service";
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../../../../services/auth/auth.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnDestroy{
  subscriptions: Subscription[] = []

  stateCtrl = new FormControl('');

  filteredRecipes!: Observable<Recipe[]>;

  userDataObs!: Observable<User>;
  imageUrl!: string;

  constructor( private router: Router,
               private filterService: FiltersService,
               public authService: AuthService) {}

  ngOnInit(): void{
  //this.filteredRecipes = this.filterService.getRecipesByFilter('a');

    let auth = undefined
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

  onClickGoHome() {
    this.router.navigateByUrl(HOME).then();
  }

  onClickGoToRecipes() {
    this.router.navigateByUrl(SEARCH).then();
  }

  onClickGoToCreateRecipe() {
    this.router.navigateByUrl(CREATE).then();
  }

  onClickGoToMyRecipe() {
    this.router.navigateByUrl(MYRECIPE).then();
  }

  onClickLogin() {
    this.router.navigateByUrl(AUTH).then();
  }

  onClickLogout() {
    this.authService.logout()
  }

  filterOnEnter(event: KeyboardEvent) {
    if (event.code === 'Enter' && this.stateCtrl.value) {
      this.filteredRecipes = this.filterService.getRecipesByFilter(this.stateCtrl.value);
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const newPath = RECIPE + event.option.value
    this.router.navigateByUrl(newPath).then();
  }

  getImageUrl(image: string): string{
    return environment.imageUrl + image;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
