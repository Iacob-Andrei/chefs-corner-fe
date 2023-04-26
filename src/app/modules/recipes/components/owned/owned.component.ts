import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CREATE, RECIPE} from "@app-shared/constants";
import {Recipe} from "@app-shared/models";
import {PageService} from "../../services/page.service";
import {RecipeService} from "../../services/recipe.service";
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-owned',
  templateUrl: './owned.component.html',
  styleUrls: ['./owned.component.scss']
})
export class OwnedComponent implements OnInit, OnDestroy{

  subscriptions: Subscription[] = [];
  myRecipesObs!: Observable<Recipe[]>;
  constructor(private router: Router,
              private pageService: PageService,
              private recipeService: RecipeService,
              public authService: AuthService){}

  ngOnInit(): void {
    this.myRecipesObs = this.pageService.getMyRecipes();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  goToRecipe(id: number) {
    const newRoute = RECIPE + id;
    this.router.navigateByUrl(newRoute).then();
  }

  getRouteImage(image: any) {
    return image ? `data:image/png;base64,${image}` : "./assets/icons/default-profile.jpg";
  }

  onClickGoToGenerate() {
    this.router.navigateByUrl(CREATE).then();
  }

  onClickDelete(id: number) {
    this.subscriptions.push(
    this.recipeService.deleteRecipe(id).subscribe(
      () => {
        window.location.reload();
      }
    ));
  }
}
