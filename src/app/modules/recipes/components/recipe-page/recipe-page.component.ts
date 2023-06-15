import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription, take} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Recipe} from "@app-shared/models";
import {RecipeService} from "../../services/recipe.service";
import {environment} from "../../../../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";
import {EDIT, HOME, MYRECIPE, PAGE_404, SEARCH} from "@app-shared/constants";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../../services/auth/auth.service";
import {PriceDialogComponent} from "@app-shared/components/dialog/price-dialog/price-dialog.component";
import {
  AddPermissionDialogComponent
} from "@app-shared/components/dialog/add-permission-dialog/add-permission-dialog.component";
import {
  AskPermissionDialogComponent
} from "@app-shared/components/dialog/ask-permission-dialog/ask-permission-dialog.component";
import {DeleteConfDialogComponent} from "@app-shared/components/dialog/delete-conf-dialog/delete-conf-dialog.component";
import {MenuService} from "../../../menu/services/menu.service";
import {RecipeMenuDialogComponent} from "@app-shared/components/dialog/recipe-menu-dialog/recipe-menu-dialog.component";


@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit, OnDestroy{
  subscriptions: Subscription[] = []
  protected imageUrl = environment.imageUrl;
  protected ingredientsUrl = environment.imageUrl;
  protected recipe!: Recipe;
  protected recipeObs!: Observable<Recipe>;
  sortedDirections!: any;
  form! : FormGroup;
  currencyRate!: any;
  menus : any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public toaster: ToastrService,
              public authService: AuthService,
              private recipeService: RecipeService,
              private menuService: MenuService,
              public dialog: MatDialog) {}

  ngOnInit(): void{
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        if(isNaN(Number(params['id']))){
          this.showErrorToaster('400',`Invalid recipe id '${params['id']}'.`);
          this.router.navigateByUrl(PAGE_404).then();
        }
        else{
          this.getRecipeData(params['id']);
        }
      }
    ));

    this.subscriptions.push(
      this.menuService.getMenus().subscribe(
        (data) => {
          this.menus = data;
        }
      )
    )
  }

  getRecipeData(id: string): void{
    this.recipeObs = this.recipeService.getRecipeById(id);
    // this.subscriptions.push(
    //   this.recipeService.getCurrencyData().pipe(take(1))
    //     .subscribe(data => {
    //       this.currencyRate = data.data;
    //     })
    // )  TODO: decomenteaza cand e gata

    this.currencyRate =
      {EUR: 0.931851, RON: 4.622405, USD: 1}

    this.subscriptions.push(
      this.recipeObs.subscribe(
        response => {
          if(response) {
            this.sortedDirections = response.directions?.sort((a, b) => a.order > b.order ? 0 : -1)
            this.recipe = response;

            if (response.owner === "public") {
              this.imageUrl += response.image;
            } else {
              this.imageUrl = response.file ? `data:image/png;base64,${response.file}` : "./assets/icons/default-profile.jpg";
            }

            this.form = this.createForm();
            this.getValueChanges();
          }
        }, (error) => {
          if(error.status === 403) {
            const dialogRef: any = this.dialog.open(AskPermissionDialogComponent,{
              data: { id: id }
            });
            dialogRef.afterClosed().pipe(take(1)).subscribe(
              () => this.router.navigateByUrl(HOME)
            )
          }
        }
    ));
  }

  createForm() {
    const group: any = {};
    const ingredients = this.recipe.ingredients ? this.recipe.ingredients : [];

    group['number_servings'] = new FormControl(this.recipe.number_servings);

    ingredients.forEach(item => {
      group[`${item.id}_amount`] = new FormControl(item.amount);
      group[`${item.id}_grams`] = new FormControl(item.grams * item.amount);
    });

    return new FormGroup(group);
  }

  getValueChanges() {
    Object.keys(this.form.controls).forEach(key => {
      this.subscriptions.push(
        this.form.controls[key].valueChanges.subscribe(
          value => this.updateOnValue(key, value)
        )
      )
    });
  }

  updateOnValue(key: string, value: number){
    if (!value || value < 0.1) return;
    let ratio;

    if (key === "number_servings"){
      ratio = this.recipe.number_servings ? value / this.recipe.number_servings : 1;
    }
    else{
      const id = key.split("_")[0];
      const modified_key = key.split("_")[1];
      ratio = this.getRatioUpdate( +id, modified_key, value);
    }

    this.updateValues(ratio);
  }

  getRatioUpdate(id: number, key: string, value: number){
    const ingredients = this.recipe.ingredients ? this.recipe.ingredients : [];

    for( let item of ingredients ){
      if (item.id === id){
        if (key === 'amount')
          return value / item.amount;
        return value / ( item.grams * item.amount );
      }
    }

    return 1;
  }

  updateValues(ratio: number){
    const new_size = this.recipe.number_servings ? this.recipe.number_servings * ratio : 1
    this.form.controls['number_servings'].setValue(new_size, { emitEvent: false });
    const ingredients = this.recipe.ingredients ? this.recipe.ingredients : [];

    ingredients.forEach(item => {
      this.form.controls[`${item.id}_amount`].setValue(ratio * item.amount, { emitEvent: false });
      this.form.controls[`${item.id}_grams`].setValue(ratio * item.amount * item.grams, { emitEvent: false });
    });
  }

  showErrorToaster(title: string, message: string): void{
    this.toaster.error(message, title, {});
  }

  goToSearch(category: string) {
    const newRoute = category.toLowerCase() === '' ? SEARCH :  SEARCH + "/" + category.toLowerCase();
    this.router.navigateByUrl(newRoute).then();
  }

  goToMyRecipes() {
    this.router.navigateByUrl(MYRECIPE).then();
  }

  onClickShowPrices() {
    this.dialog.open(PriceDialogComponent,{
      data: {
        ingredients: this.recipe?.ingredients,
        quantities: this.form.controls,
        rates: this.currencyRate
      }
    });
  }

  onClickGivePermission() {
    this.dialog.open(AddPermissionDialogComponent,{
      data: {
        idRecipe: this.recipe?.id,
      }
    });
  }

  onClickDelete() {
    this.dialog.open(DeleteConfDialogComponent,{
      data: {
        idRecipe: this.recipe?.id,
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  onClickAddToMenu() {
    const dialogRef: any = this.dialog.open(RecipeMenuDialogComponent,
      {
        data: {
          categories: this.recipe.categories,
          menus: this.menus
        }
      });
    dialogRef.afterClosed().pipe(take(1)).subscribe((result: any) => {
      if(result) {
        this.addRecipeToMenu(result.idMenu, result.category);
      }
    })
  }

  addRecipeToMenu(idMenu: any, category: any) {
    this.subscriptions.push(
      this.menuService.addRecipeToMenu(idMenu, this.recipe.id, category).subscribe(
        () => this.toaster.success('Recipe added successfully to menu!', 'Success')
      )
    )
  }

  onClickEdit() {
    let data = this.recipe;
    data.file = '';
    data.directions?.forEach(direction => {
      if(direction.video_data){
        direction.video_data = 'Old video instruction.'
      }else{
        direction.video_data = ''
      }
    })
    window.localStorage.setItem("recipe", JSON.stringify(data));
    this.router.navigateByUrl(EDIT).then();
  }
}
