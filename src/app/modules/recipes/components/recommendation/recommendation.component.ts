import {Component, ElementRef, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Observable, take} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FiltersService} from "@app-shared/components/top-bar/services/filters.service";
import {Ingredient} from "@app-shared/models/ingredient.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredIngrObs!: Observable<Ingredient[]>;
  selectedIngredients: Ingredient[] = [];

  @ViewChild('ingrdInput') ingrdInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('auto') matAutocomplete: MatAutocomplete | undefined;

  constructor(private ingredientService: FiltersService,
              private toaster: ToastrService) {}

  getNewIngredients(event: MatChipInputEvent): void {
    if(event.value.trim()) {
      this.filteredIngrObs = this.ingredientService.getIngredientsByFilter(event.value.trim());
    }
  }

  remove(ingr: Ingredient): void {
    const index = this.selectedIngredients.indexOf(ingr);
    if (index >= 0) {
      this.selectedIngredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.selectedIngredients.find(item => item.name === event.option.viewValue)) {
      const ingrName = event.option.viewValue;
      this.filteredIngrObs.pipe(take(1)).subscribe(recipes => {
        const found = recipes.find(recipe => recipe.name === ingrName)
        if(found) this.selectedIngredients.push(found);
      })
    }

    if(this.ingrdInput)
      this.ingrdInput.nativeElement.value = '';
  }

  onClickGetRecipes() {
    if(this.selectedIngredients.length <= 1){
      this.toaster.warning("Please select at least 2 ingredients!", "Warning");
    }
    else {
      //TODO: get recipes
    }
  }
}
