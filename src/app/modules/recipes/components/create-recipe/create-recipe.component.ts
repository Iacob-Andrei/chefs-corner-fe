import {Component, OnDestroy, ViewChild} from '@angular/core';
import {getErrorMsgRequiredValue} from "../../../authentification/validators/error-messages";
import {map, Observable, Subscription} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {ToastrService} from "ngx-toastr";
import {Ingredient} from "@app-shared/models/ingredient.model";
import {FiltersService} from "@app-shared/components/top-bar/services/filters.service";
import {RecipePost} from "@app-shared/models/recipePost.model";
import {AuthService} from "../../../../services/auth/auth.service";
import {Direction} from "@app-shared/models/direction.model";
import {RecipeService} from "../../services/recipe.service";
import {HOME} from "@app-shared/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnDestroy{
  @ViewChild('stepper') stepper!: MatStepper   ;

  subscriptions: Subscription[] = [];
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
    amount1: new FormControl(1, [Validators.required, Validators.min(1)]),
    units1: new FormControl('', [Validators.required]),
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
    private filterService: FiltersService,
    private authService: AuthService,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  onConfirmClick() {
    let request: RecipePost = {} as RecipePost;

    request.name = this.firstFormGroup.controls.title.value ? this.firstFormGroup.controls.title.value : ''
    request.prep_time = this.firstFormGroup.controls.prepTime.value ? this.firstFormGroup.controls.prepTime.value : 1
    request.cook_time = this.firstFormGroup.controls.cookTime.value ? this.firstFormGroup.controls.cookTime.value : 1
    request.number_servings = this.firstFormGroup.controls.numberOfServings.value ? this.firstFormGroup.controls.numberOfServings.value : 1
    request.owner = this.authService.getSubjectFromToken();

    let directions: Direction[] = [];
    let order: number = 1;
    this.directionsCount.forEach(index => {
      let instr = this.thirdFormGroup.get(`direction${index}`)?.value
      directions.push({
        id: 0,
        order: order,
        instruction: instr ? instr : ''
      })
      order += 1;
    })
    request.directions = directions;

    let ingredients: Ingredient[] = []
    this.ingredientsCount.forEach(index => {
      let name = this.secondFormGroup.get(`ingredient${index}`)?.value
      let direction = this.secondFormGroup.get(`description${index}`)?.value
      let amount = this.secondFormGroup.get(`amount${index}`)?.value
      let unit = this.secondFormGroup.get(`units${index}`)?.value
      let grams = this.secondFormGroup.get(`gramsPerUnit${index}`)?.value

      ingredients.push({
        id: 0,
        name: name ? String(name) : '',
        description: direction ? String(direction) : '',
        amount: amount ? Number(amount) : 0,
        unit: unit ? String(unit) : '',
        grams: grams ? Number(grams) : 0,
      });
    })
    request.ingredients = ingredients;

    this.subscriptions.push(
      this.recipeService.postRecipe(request).subscribe(
        (response: any) => {
          this.uploadImage(response.id);
          this.uploadVideos(response.id);

          this.router.navigateByUrl(HOME).then();
        },
        (error) => {
          this.showWarningToaster("Invalid arguments",error.message)
        }
      )
    );
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
      [`amount${last+1}`]: new FormControl(1, [Validators.required, Validators.min(1)]),
      [`units${last+1}`]: new FormControl('', [Validators.required]),
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

  private uploadImage(id: number) {
    if(!this.recipeImageFile) return;

    this.subscriptions.push(
      this.recipeService.patchImage(id,this.recipeImageFile).subscribe(
        () => {},
        () => {
          this.showWarningToaster("Error while loading image", "Re-upload video in recipe page.")
        }
      )
    )
  }

  private uploadVideos(id: number) {
    let order = 0;
    this.directionsCount.forEach((index: number) => {
      order += 1;

      if(this.directionsVideoFile[index] === undefined)
        return

      this.subscriptions.push(
        this.recipeService.uploadVideoRecipe(id, order, this.directionsVideoFile[index]).subscribe(
          () => {},
          () => {
            this.showWarningToaster(`Error while loading video ${order}`, "Re-upload video in recipe page.")
          }
        )
      );
    });
  }

  showErrorToaster(title: string, message: string): void{
    this.toaster.error(message, title, {});
  }

  showWarningToaster(title: string, message: string): void{
    this.toaster.warning(message, title, {});
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
