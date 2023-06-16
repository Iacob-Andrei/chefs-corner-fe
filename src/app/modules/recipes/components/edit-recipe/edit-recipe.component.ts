import {Component, OnInit, ViewChild} from '@angular/core';
import {Recipe} from "@app-shared/models";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FiltersService} from "@app-shared/components/top-bar/services/filters.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {RecipeService} from "../../services/recipe.service";
import {map, Observable, Subscription} from "rxjs";
import {MatStepper} from "@angular/material/stepper";
import {getErrorMsgRequiredValue} from "../../../authentification/validators/error-messages";
import {StepperOrientation} from "@angular/cdk/stepper";
import {CATEGORIES, HOME} from "@app-shared/constants";
import {Ingredient} from "@app-shared/models/ingredient.model";
import {RecipePost} from "@app-shared/models/recipePost.model";
import {Direction} from "@app-shared/models/direction.model";

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  recipe!: Recipe;

  subscriptions: Subscription[] = [];
  getErrorMsgRequired = getErrorMsgRequiredValue;
  stepperOrientation: Observable<StepperOrientation>;

  recipeImageName = '';
  recipeImageFile: File | undefined;
  directionsVideoName: string[] = [];
  directionsVideoFile: File[] = [];

  categoriesList = CATEGORIES.slice(1);
  firstFormGroup!: any;

  filteredIngredients!: Observable<Ingredient[]>;
  ingredientsCount: number[] = [];
  secondFormGroup = this._formBuilder.record({});

  directionsCount: number[] = [];
  thirdFormGroup = this._formBuilder.record({});

  constructor(private toastr: ToastrService,
              private router: Router,
              private _formBuilder: FormBuilder,
              breakpointObserver: BreakpointObserver,
              private filterService: FiltersService,
              private authService: AuthService,
              private recipeService: RecipeService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    let data = window.localStorage.getItem("recipe");
    window.localStorage.removeItem("recipe");

    if(!data){
      this.toastr.error("No recipe to edit!", "Error");
      this.router.navigateByUrl(HOME).then();
    }

    this.recipe = JSON.parse(data? data:'');
    this.initializeFormData();
  }

  initializeFormData(){
    this.firstFormGroup = this._formBuilder.record({
        title: [this.recipe.name, Validators.required],
        categories: [this.recipe.categories, Validators.required],
        cookTime: [this.recipe.cook_time, [Validators.required, Validators.min(0)]],
        prepTime: [this.recipe.prep_time, [Validators.required, Validators.min(0)]],
        numberOfServings: [this.recipe.number_servings, [Validators.required, Validators.min(1)]]
      }
    );
    this.recipeImageName ='Old Photo';

    if(this.recipe.ingredients){
      for (const [index, ingredient] of this.recipe.ingredients.entries()) {
        this.secondFormGroup = this._formBuilder.record({
          ...this.secondFormGroup.controls,
          [`ingredient${index+1}`]: new FormControl(ingredient.name, Validators.required),
          [`description${index+1}`]: new FormControl(ingredient.description, Validators.required),
          [`amount${index+1}`]: new FormControl(ingredient.amount, [Validators.required, Validators.min(1)]),
          [`units${index+1}`]: new FormControl(ingredient.unit, [Validators.required]),
          [`gramsPerUnit${index+1}`]: new FormControl(ingredient.grams, [Validators.required, Validators.min(1)]),
        });
        this.ingredientsCount.push(index+1)
      }
    }

    if(this.recipe.directions){
      this.recipe.directions.sort((a,b) => a.order - b.order);
      for (const [index, direction] of this.recipe.directions.entries()){
        this.thirdFormGroup = this._formBuilder.record({
          ...this.thirdFormGroup.controls,
          [`direction${index+1}`]: new FormControl(direction.instruction, Validators.required)
        });
        this.directionsCount.push(index+1);
        if(direction.video_data){
          this.directionsVideoName[index + 1] = direction.video_data.toString();
        }
      }
    }
  }

  onConfirmClick() {
    let request: RecipePost = {} as RecipePost;

    request.id = this.recipe.id
    request.name = this.firstFormGroup.controls.title.value ? this.firstFormGroup.controls.title.value : ''
    request.prep_time = this.firstFormGroup.controls.prepTime.value ? this.firstFormGroup.controls.prepTime.value : 1
    request.cook_time = this.firstFormGroup.controls.cookTime.value ? this.firstFormGroup.controls.cookTime.value : 1
    request.number_servings = this.firstFormGroup.controls.numberOfServings.value ? this.firstFormGroup.controls.numberOfServings.value : 1
    request.categories = this.firstFormGroup.controls.categories.value ? this.firstFormGroup.controls.categories.value : []

    let directions: Direction[] = [];
    let order: number = 1;
    this.directionsCount.forEach(index => {
      let instr = this.thirdFormGroup.get(`direction${index}`)?.value as string;
      let video_name = '';
      let size = this.recipe.directions?.length ? this.recipe.directions?.length : 0;
      if(size >= index){
        video_name = this.recipe.directions ? this.recipe.directions[index-1].video_name : '';
      }

      directions.push({
        id: 0,
        order: order,
        instruction: instr ? instr : '',
        video_name: video_name
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
      this.recipeService.patchRecipe(request).subscribe(
        () => {
          this.uploadImage(this.recipe.id);
          this.uploadVideos(this.recipe.id);

          this.router.navigateByUrl(HOME).then();
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

  removeIngredient(index: number) {
    this.secondFormGroup.removeControl(`ingredient${index}`);
    this.secondFormGroup.removeControl(`description${index}`);
    this.secondFormGroup.removeControl(`units${index}`);
    this.secondFormGroup.removeControl(`gramsPerUnit${index}`);
    this.ingredientsCount = this.ingredientsCount.filter(obj => {
      return obj !== index
    });
  }

  getFormControl(name: string, index: number, form: FormGroup) {
    return form.get(name + index) as FormControl<string | number | null>;
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

  removeDirection(index: number) {
    this.thirdFormGroup.removeControl(`direction${index}`);
    this.directionsCount = this.directionsCount.filter(obj => {
      return obj !== index
    });
  }

  onFileSelectedVideo(event: any, index: number) {
    this.directionsVideoFile[index] = event.target.files[0];
    if (this.directionsVideoFile[index]) {
      this.directionsVideoName[index] = this.directionsVideoFile[index].name;
    }
  }

  private uploadImage(id: number) {
    if(!this.recipeImageFile) return;

    this.subscriptions.push(
      this.recipeService.patchImage(id,this.recipeImageFile).subscribe(
        () => {}
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
            this.toastr.warning(`Error while loading video ${order}`, "Re-upload video in recipe page.")
          }
        )
      );
    });
  }
}
