import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription, take} from "rxjs";
import {PAGE_404, RECIPE} from "@app-shared/constants";
import {ToastrService} from "ngx-toastr";
import {Menu} from "@app-shared/models/menu.model";
import {MenuService} from "../../services/menu.service";
import {environment} from "../../../../../environments/environment";
import {Recipe} from "@app-shared/models";
import {MatDialog} from "@angular/material/dialog";
import {RecipeService} from "../../../recipes/services/recipe.service";
import {PriceDialogComponent} from "@app-shared/components/dialog/price-dialog/price-dialog.component";
import {GetRecipesDialogComponent} from "@app-shared/components/dialog/get-recipes-dialog/get-recipes-dialog.component";

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit, OnDestroy{
  idMenu: number = 0;
  subscriptions: Subscription[] = [];
  menuObs!: Observable<Menu>;
  addOns: number = 50;
  currencyRate!: any;
  currency!: any;
  currencies = [
    {"currency": 'RON', "rate": 1},
    {"currency": 'EUR', "rate": 1},
    {"currency": 'USD', "rate": 1},
  ]

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService,
              private menuService: MenuService,
              private recipeService: RecipeService,
              private dialog: MatDialog){
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.params.subscribe(params => {
          if(isNaN(Number(params['id']))){
            this.showErrorToaster('404',`Invalid menu id '${params['id']}'.`);
            this.router.navigateByUrl(PAGE_404).then();
          }
          else{
            this.idMenu = params['id'];
            this.menuObs = this.menuService.getMenuById(this.idMenu);
          }
        }
      ));

    this.recipeService.getCurrencyData().pipe(take(1)).subscribe(data => {
      this.currencyRate = data.data;
      this.currencies[0].rate = data.data.RON;
      this.currencies[1].rate = data.data.EUR;
      this.currencies[2].rate = data.data.USD;
      this.currency = this.currencies[0];
    });
  }

  getIcon(category: string) {
    return "./assets/icons/" + category.toLowerCase().replace(" ", "") + ".png"
  }

  getCategories(menu: Menu) {
    return Object.keys(menu.recipes);
  }

  getRouteImage(item: Recipe) {
    return item.file? `data:image/png;base64,${item.file}` : environment.imageUrl + item.image;
  }

  goToRecipe(id: number) {
    const newRoute = RECIPE + id;
    this.router.navigateByUrl(newRoute).then();
  }

  onClickShowPrices(recipe: Recipe) {
    this.dialog.open(PriceDialogComponent,{
      data: {
        ingredients: recipe?.ingredients,
        quantities: undefined,
        rates: this.currencyRate
      }
    });
  }

  computePriceRecipe(recipe: Recipe){
    let price = 0;
    recipe.ingredients?.forEach(ingredient => {
      price += ingredient.amount * ingredient.price_per_unit;
    });

    return price;
  }

  showErrorToaster(title: string, message: string): void{
    this.toaster.error(message, title, {});
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onClickRequestRecipes() {
    const dialogRef: any = this.dialog.open(GetRecipesDialogComponent);
    dialogRef.afterClosed().pipe(take(1)).subscribe((result: any) => {
      if(result)
        if(result.total){
          this.addRecipesToMenu(result.requested);
        }
    })
  }

  addRecipesToMenu(requested: any) {
    this.subscriptions.push(
      this.recipeService.getRecipesForMenu(this.idMenu, requested).subscribe(
        () => location.reload()
      )
    )
  }
}
