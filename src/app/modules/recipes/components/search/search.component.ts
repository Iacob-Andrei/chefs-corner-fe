import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Page} from "@app-shared/models/page.model";
import {PageService} from "../../services/page.service";
import {CATEGORIES, RECIPE, SEARCH} from "@app-shared/constants";
import {PageEvent} from "@angular/material/paginator";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy{

  subscriptions: Subscription[] = []
  page!: number;
  maxPages!: number;
  type!: string;
  protected pageRecipes!: Page;
  protected pageObs!: Observable<Page>;
  constCategories = CATEGORIES;
  selectedCategory = CATEGORIES[0];

  constructor(private route: ActivatedRoute,
              private pageService: PageService,
              private router: Router){}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.type = params['type'] ? params['type'] : "";
      })
    )

    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {
        this.page = params['page'] ? params['page'] : 0
      })
    );

    for(let index in CATEGORIES){
      if (this.type == CATEGORIES[index].value){
        this.selectedCategory = CATEGORIES[index];
        break;
      }
    }
    this.getRecipesForPage();
  }

  getRecipesForPage(): void{
    this.pageObs = this.pageService.getRecipeById(this.page, this.type);

    this.subscriptions.push(
      this.pageObs.subscribe(
        response => {
          this.pageRecipes = response;
          this.maxPages = response.totalPages + 1;
        }
      )
    )
  }

  changeInSelect() {
    const newRoute = this.selectedCategory.value == "" ? SEARCH : SEARCH + "/" + this.selectedCategory['value']
    this.router.navigateByUrl(newRoute).then(() => {
      window.location.reload();
    });
  }

  changePageNavigation(data: PageEvent){
    const newPage = data.pageIndex;
    const newRoute = SEARCH + "/" + this.selectedCategory['value'];
    this.router.navigate(
      [newRoute],
      {queryParams:{page:newPage}}
    ).then(() => {
      window.location.reload();
    })
  }

  getRouteImage(image: string) {
    return environment.imageUrl + image;
  }

  goToRecipe(id: number) {
    const newRoute = RECIPE + id;
    this.router.navigateByUrl(newRoute).then(() => {
      window.location.reload();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
