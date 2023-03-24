import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Recipe} from "../../../../shared/models";
import {RecipeService} from "../../services/recipe.service";
import {environment} from "../../../../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";
import {PAGE_404, SEARCH} from "../../../../shared/constants";

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

  form! : FormGroup;


  constructor(private route: ActivatedRoute,
              private router: Router,
              public toaster: ToastrService,
              private recipeService: RecipeService) {}

  ngOnInit(): void{
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        if( isNaN(Number(params['id']))){
          this.showErrorToaster('400',`Invalid recipe id '${params['id']}'.`);
          this.router.navigateByUrl(PAGE_404).then();
        }
        else{
          this.getRecipeData(params['id']);
        }
      }
    ));
  }

  getRecipeData(id: string): void{
    this.recipeObs = this.recipeService.getRecipeById(id);

    this.subscriptions.push(
      this.recipeObs.subscribe(
        response => {
          this.recipe = response;
          this.imageUrl += response.image;
          console.log(this.recipe)
        },
        error => {
          this.showErrorToaster(error['error']['statusCode'],error['error']['message']);
          this.router.navigateByUrl(PAGE_404).then();
        },
        () => {
          this.form = this.createForm();
          this.getValueChanges();
        }
    ));
  }

  createForm() {
    const group: any = {};
    const ingredients = this.recipe.ingredients ? this.recipe.ingredients : [];

    group['number_servings'] = new FormControl(this.recipe.number_servings);

    ingredients.forEach(item => {
      group[`${item.ingredient.id}_amount`] = new FormControl(item.amount);
      group[`${item.ingredient.id}_grams`] = new FormControl(item.grams * item.amount);
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
      if (item.ingredient.id === id){
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
      this.form.controls[`${item.ingredient.id}_amount`].setValue(ratio * item.amount, { emitEvent: false });
      this.form.controls[`${item.ingredient.id}_grams`].setValue(ratio * item.amount * item.grams, { emitEvent: false });
    });
  }

  showErrorToaster(title: string, message: string): void{
    this.toaster.error(message, title, {});
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  goToSearch(category: string) {
    const newRoute = category.toLowerCase() === '' ? SEARCH :  SEARCH + "/" + category.toLowerCase();
    this.router.navigateByUrl(newRoute).then(() => {
      window.location.reload();
    });
  }
}
