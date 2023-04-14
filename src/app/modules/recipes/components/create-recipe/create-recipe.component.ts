import {Component, ViewChild} from '@angular/core';
import {
  getErrorMsgRequiredValue
} from "../../../authentification/validators/error-messages";
import {map, Observable} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {ToastrService} from "ngx-toastr";
import {Ingredient} from "../../../../shared/models/ingredient.model";
import {FiltersService} from "../../../../shared/components/top-bar/services/filters.service";

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent{
  @ViewChild('stepper') stepper!: MatStepper   ;

  getErrorMsgRequired = getErrorMsgRequiredValue;
  stepperOrientation: Observable<StepperOrientation>;

  recipeImageName = '';
  recipeImageFile: File | undefined;
  directionsVideoName: string[] = [];
  directionsVideoFile: File[] = [];

  firstFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    cookTime: [0, [Validators.required, Validators.min(0)]],
    prepTime: [0, [Validators.required, Validators.min(0)]],
    numberOfServings: [1, [Validators.required, Validators.min(1)]]
  });

  filteredIngredients!: Observable<Ingredient[]>;
  ingredientsCount: number[] = [1];
  secondFormGroup = this._formBuilder.record({
    ingredient1: new FormControl('', Validators.required),
    description1: new FormControl('', Validators.required),
    units1: new FormControl(1, [Validators.required, Validators.min(1)]),
    gramsPerUnit1: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  directionsCount: number[] = [1];
  thirdFormGroup = this._formBuilder.record({
    direction1: new FormControl('', Validators.required)
  })

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private toaster: ToastrService,
    private filterService: FiltersService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

  }

  onConfirmClick() {
    console.log("DETAILS:")
    console.log(this.firstFormGroup.controls.title.value)
    console.log(this.firstFormGroup.controls.cookTime.value)
    console.log(this.firstFormGroup.controls.prepTime.value)
    console.log(this.recipeImageName)

    console.log("INGREDIENTS:")
    this.ingredientsCount.forEach(index => {
      console.log(
        this.secondFormGroup.get(`ingredient${index}`)?.value,
        this.secondFormGroup.get(`description${index}`)?.value,
        this.secondFormGroup.get(`units${index}`)?.value,
        this.secondFormGroup.get(`gramsPerUnit${index}`)?.value
      )
    })

    console.log("INSTRUCTIONS:")
    this.directionsCount.forEach(index => {
      console.log(this.thirdFormGroup.get(`direction${index}`)?.value);
      console.log(this.directionsVideoName[index]);
    })
  }

  onFileSelected(event: any) {
    this.recipeImageFile = event.target.files[0];
    if (this.recipeImageFile) {
      this.recipeImageName = this.recipeImageFile.name;
    }
  }

  onFileSelectedVideo(event: any, index: number) {
    this.directionsVideoFile[index] = event.target.files[0];
    if (this.directionsVideoFile[index]) {
      this.directionsVideoName[index] = this.directionsVideoFile[index].name;
    }
  }

  toSecondStepper() {
    if (this.recipeImageName !== '') {
      this.stepper.next();
    }else{
      this.showWarningToaster("No file uploaded", "Please upload an image for your recipe!");
    }
  }

  filterOnEnter(event: KeyboardEvent, index: number) {
    if (event.code === 'Enter' && this.secondFormGroup.get('ingredient'+index)?.value) {
      this.filteredIngredients = this.filterService.getIngredientsByFilter(
        this.secondFormGroup.get('ingredient'+index)?.value
      );
    }
  }

  addIngredient() {
    let last = this.ingredientsCount.pop();
    last = last ? last : 1;
    this.ingredientsCount.push(last, last + 1);

    this.secondFormGroup = this._formBuilder.record({
      ...this.secondFormGroup.controls,
      [`ingredient${last+1}`]: new FormControl('', Validators.required),
      [`description${last+1}`]: new FormControl('', Validators.required),
      [`units${last+1}`]: new FormControl(1, [Validators.required, Validators.min(1)]),
      [`gramsPerUnit${last+1}`]: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  addDirection(){
    let last = this.directionsCount.pop();
    last = last ? last : 1;
    this.directionsCount.push(last, last + 1);

    this.thirdFormGroup = this._formBuilder.record({
      ...this.thirdFormGroup.controls,
      [`direction${last+1}`]: new FormControl('', Validators.required)
    })
  }

  getFormControl(name: string, index: number, form: FormGroup) {
    return form.get(name + index) as FormControl<string | number | null>;
  }

  removeIngredient(index: number) {
    this.secondFormGroup.removeControl(`ingredient${index}`);
    this.secondFormGroup.removeControl(`description${index}`);
    this.secondFormGroup.removeControl(`units${index}`);
    this.secondFormGroup.removeControl(`gramsPerUnit${index}`);
    this.ingredientsCount = this.ingredientsCount.filter(obj => {
      return obj !== index
    });
  }

  removeDirection(index: number) {
    this.thirdFormGroup.removeControl(`direction${index}`);
    this.directionsCount = this.directionsCount.filter(obj => {
      return obj !== index
    });
  }

  showErrorToaster(title: string, message: string): void{
    this.toaster.error(message, title, {});
  }

  showWarningToaster(title: string, message: string): void{
    this.toaster.warning(message, title, {});
  }
}
