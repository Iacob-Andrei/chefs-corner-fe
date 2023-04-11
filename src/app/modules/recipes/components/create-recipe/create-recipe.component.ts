import {Component, ViewChild} from '@angular/core';
import {
  getErrorMsgRequiredValue
} from "../../../authentification/validators/error-messages";
import {map, Observable} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";

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

  firstFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    cookTime: [0, [Validators.required, Validators.min(0)]],
    prepTime: [0, [Validators.required, Validators.min(0)]]
  });

  ingredientsCount: number[] = [1];
  secondFormGroup = this._formBuilder.record({
    ingredient1: new FormControl('', Validators.required),
    description1: new FormControl('', Validators.required),
    units1: new FormControl(0, [Validators.required, Validators.min(0)]),
    gramsPerUnit1: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

  }

  onConfirmClick() {

  }

  onFileSelected(event: any) {
    this.recipeImageFile = event.target.files[0];
    if (this.recipeImageFile) {
      this.recipeImageName = this.recipeImageFile.name;
    }
  }

  toSecondStepper() {
    // if (this.recipeImageName !== '') {
      this.stepper.next();
    // }
  }

  addIngredient() {
    let last = this.ingredientsCount.pop();
    last = last ? last : 1;
    this.ingredientsCount.push(last, last + 1);

    this.secondFormGroup = this._formBuilder.record({
      ...this.secondFormGroup.controls,
      [`ingredient${last+1}`]: new FormControl('', Validators.required),
      [`description${last+1}`]: new FormControl('', Validators.required),
      [`units${last+1}`]: new FormControl(0, [Validators.required, Validators.min(0)]),
      [`gramsPerUnit${last+1}`]: new FormControl(0, [Validators.required, Validators.min(0)]),
    });

    Object.keys(this.secondFormGroup.controls).forEach((key: string) => {
      console.log(key, this.secondFormGroup.get(key)?.value)
    })
  }

  getFormControl(name: string, index: number) {
    return this.secondFormGroup.get(name + index) as FormControl<string | number | null>;
  }
}
