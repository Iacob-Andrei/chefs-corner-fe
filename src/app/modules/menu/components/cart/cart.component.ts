import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectCartEntries} from "../../../../services/store/cart.selectors";
import {Observable, take} from "rxjs";
import {RecipeService} from "../../../recipes/services/recipe.service";
import {Recipe} from "@app-shared/models";
import {environment} from "../../../../../environments/environment";
import {MENUS, RECIPE, SEARCH} from "@app-shared/constants";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PriceMenuDialogComponent} from "../dialog/price-menu-dialog/price-menu-dialog.component";
import {GetRecipesDialogComponent} from "../dialog/get-recipes-dialog/get-recipes-dialog.component";
import {addRecipe, clearCart, removeRecipe} from "../../../../services/store/cart.actions";
import {CompleteMenuDialogComponent} from "../dialog/complete-menu-dialog/complete-menu-dialog.component";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  isEmpty!: boolean;
  recipesObs!: Observable<Recipe[]>;
  currentForm: any = {};
  addOns: number = 50;

  constructor(private store: Store,
              private router: Router,
              private recipeService: RecipeService,
              public dialog: MatDialog,
              public menuService: MenuService) {};

  ngOnInit(): void {
    this.store.select(selectCartEntries).pipe(take(1)).subscribe(recipes => {
      if(recipes.length === 0){
        this.isEmpty = true;
      }else {
        this.isEmpty = false;
        let cartIds: number[] = [];
        recipes.forEach(recipe => cartIds.push(recipe));
        this.getRecipeData(cartIds);
      }
    });
  }

  getRecipeData(cartIds: number[]) {
    this.recipesObs = this.recipeService.getRecipesByIds(cartIds);
    this.recipesObs.pipe(take(1)).subscribe(recipes => {
      recipes.forEach(recipe => {
        if(recipe.categories) {
          if(this.currentForm[recipe.categories[0]]){
            this.currentForm[recipe.categories[0]].push(recipe)
          }else{
            this.currentForm[recipe.categories[0]] = [recipe]
          }
        }
      })
    })
  }

  getNewRecipesData(requested: any){
    let newMenu: any = {}
    Object.keys(this.currentForm).forEach((category:any) => {
      newMenu[category] = this.currentForm[category].map((recipe:Recipe) => recipe.id);
    })

    this.recipesObs = this.recipeService.getRecipesForMenu(newMenu, requested);
    this.recipesObs.pipe(take(1)).subscribe(recipes => {
      this.currentForm = {};
      recipes.forEach(recipe => {
        this.store.dispatch(addRecipe(recipe))
        if(recipe.categories) {
          if(this.currentForm[recipe.categories[0]]){
            this.currentForm[recipe.categories[0]].push(recipe)
          }else{
            this.currentForm[recipe.categories[0]] = [recipe]
          }
        }
      })
    })

  }

  onClickGoToRecipes() {
    this.router.navigateByUrl(SEARCH).then();
  }

  getKeys() {
    return Object.keys(this.currentForm).sort((n1,n2) => {
      if (n1 > n2) {
        return 1;
      }
      if (n1 < n2) {
        return -1;
      }
      return 0;
    });
  }

  getRouteImage(item: Recipe) {
    return item.file? `data:image/png;base64,${item.file}` : environment.imageUrl + item.image;
  }

  onClickRemoveFromCart(recipe: Recipe, category: string) {
    this.currentForm[category] = this.currentForm[category].filter((item: Recipe) => item.id !== recipe.id);
    this.store.dispatch(removeRecipe(recipe));
  }

  goToRecipe(id: number) {
    const newRoute = RECIPE + id;
    this.router.navigateByUrl(newRoute).then(() => {
      window.location.reload();
    });
  }

  getIcon(category: string) {
    return "./assets/icons/" + category.toLowerCase().replace(" ", "") + ".png"
  }

  changeInSelect(category: string, recipe: Recipe, $event: any) {
    let newCategory = $event.value;

    if(!(Object.keys(this.currentForm).indexOf(newCategory) > -1)){
      this.currentForm[newCategory] = [];
    }
    if(!(this.currentForm[newCategory].indexOf(recipe) > -1)){
      this.currentForm[category] = this.currentForm[category].filter((item: Recipe) => item.id !== recipe.id);
      this.currentForm[newCategory].push(recipe);
    }
  }

  onClickShowPrices(recipe: Recipe) {
    this.dialog.open(PriceMenuDialogComponent,{
      data: {
        ingredients: recipe?.ingredients,
        addOns: this.addOns
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

  onClickRequestRecipes() {
    const dialogRef: any = this.dialog.open(GetRecipesDialogComponent);
    dialogRef.afterClosed().pipe(take(1)).subscribe((result: any) => {
      if(result)
        if(result.total !== 0){
          this.getNewRecipesData(result.requested);
        }
    })
  }

  onClickSubmitMenu(){
    const dialogRef: any = this.dialog.open(CompleteMenuDialogComponent);
    dialogRef.afterClosed().pipe(take(1)).subscribe((result: any) => {
      if(result){
        let currentMenu: any = {};
        Object.keys(this.currentForm).forEach(category => {
          let list: number[] = [];
          this.currentForm[category].forEach((recipe: Recipe) => list.push(recipe.id));
          currentMenu[category] = list;
        })

        this.menuService.postMenu(result.name, result.description, currentMenu).subscribe(
          () => {
            this.store.dispatch(clearCart());
            this.router.navigateByUrl(MENUS).then();
          }
        );
      }
    })
  }
}
