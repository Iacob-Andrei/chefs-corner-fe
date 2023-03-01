import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Recipe} from "../../../../shared/models";
import {RecipeService} from "../../services/recipe.service";
import {environment} from "../../../../../environment/environment";

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit, OnDestroy{
  subscriptions: Subscription[] = []
  protected imageUrl = environment.imageUrl;
  isValid: boolean = true
  protected recipe!: Recipe;

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
        }
    ));
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
