import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CATEGORIES, CREATE, RECIPE} from "@app-shared/constants";
import {Recipe} from "@app-shared/models";
import {PageService} from "../../services/page.service";

@Component({
  selector: 'app-owned',
  templateUrl: './owned.component.html',
  styleUrls: ['./owned.component.scss']
})
export class OwnedComponent implements OnInit, OnDestroy{

  subscriptions: Subscription[] = [];
  myRecipesObs!: Observable<Recipe[]>;
  constructor(private router: Router,
              private pageService: PageService){}

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

  protected readonly CATEGORIES = CATEGORIES;

  onClickGoToGenerate() {
    this.router.navigateByUrl(CREATE).then();
  }
}
