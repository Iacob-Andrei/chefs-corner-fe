import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Recipe} from "../../../../shared/models";
import {RecipeService} from "../../services/recipe.service";
import {environment} from "../../../../../environment/environment";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit, OnDestroy{
  subscriptions: Subscription[] = []
  protected imageUrl = environment.imageUrl;
  protected ingredientsUrl = environment.imageUrl;
  isValid: boolean = true
  protected recipe!: Recipe;

  form! : FormGroup;



  constructor(private route: ActivatedRoute,
              public toaster: ToastrService,
              private recipeService: RecipeService ) {}

  ngOnInit(): void{
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        if( isNaN(Number(params['id']))){
          this.showErrorToaster('400',`Invalid recipe id '${params['id']}'.`);
          this.isValid = false
        }
        else{
          this.isValid = true
          this.getRecipeData(params['id']);
        }
      }
    ));
  }

  getRecipeData(id: string): void{
    this.subscriptions.push(
      this.recipeService.getRecipeById(id).subscribe(
        response => {
          this.recipe = response;
          this.imageUrl += response.image;
          console.log(this.recipe)
        },
        error => {
          this.isValid = false
          this.showErrorToaster(error['error']['statusCode'],error['error']['message']);
        },
        () => {
          this.form = this.createForm();
          this.getValueChanges();
        }
    ));
  }

  createForm() {
    const group: any = {};
    const ingredients = this.recipe ? this.recipe.ingredients : [];

    group['number_servings'] = new FormControl(this.recipe.number_servings);

    ingredients.forEach(item => {
      group[`${item.ingredient.id}_amount`] = new FormControl(0);
      group[`${item.ingredient.id}_grams`] = new FormControl(0);
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
    console.log(key + " " + value)
  }

  showErrorToaster(title: string, message: string): void{
    this.toaster.error(message, title, {});
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  goBack() {
    window.history.go(-1);
  }
}
