import {Component, Inject, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {IngredientPriceService} from "../../services/ingredient-price.service";
import {Observable, Subscription, take} from "rxjs";
import {RecipeService} from "../../services/recipe.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatTable} from "@angular/material/table";
import {FiltersService} from "@app-shared/components/top-bar/services/filters.service";

@Component({
  selector: 'app-ingredient-prices',
  templateUrl: './ingredient-prices.component.html',
  styleUrls: ['./ingredient-prices.component.scss']
})
export class IngredientPricesComponent implements OnInit, OnDestroy{
  subscriptions: Subscription[] = []
  filteredIngredients!: Observable<any[]>;
  ingredientsObs!: Observable<any[]>;
  form!: FormGroup;
  newIngredientForm = new FormControl('')
  ingredients: any[] = [];
  changes: any = {};
  currency!: any;
  currencies = [
    {"currency": 'RON', "rate": 1},
    {"currency": 'EUR', "rate": 1},
    {"currency": 'USD', "rate": 1},
  ];
  displayedColumns: string[] = ['seller-name', 'seller-price', 'actions'];

  @ViewChildren(MatTable) table!: QueryList<MatTable<any>>;
  constructor(private recipeService: RecipeService,
              private ingredientPriceService: IngredientPriceService,
              private filterService: FiltersService,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getIngredients();
  }

  getIngredients() {
    this.ingredientsObs = this.ingredientPriceService.getIngredientPrices();
    this.ingredientsObs.pipe(take(1)).subscribe(
      result => {
        this.ingredients = result;
        this.getCurrency();
      });
  }

   getCurrency() {
      this.recipeService.getCurrencyData().pipe(take(1))
      .subscribe(data => {
        this.currencies[0].rate = data.data.RON;
        this.currencies[1].rate = data.data.EUR;
        this.currencies[2].rate = data.data.USD;
        this.currency = this.currencies[0];

        this.form = this.createForm();
        this.getValueChanges();
      });
  }

  createForm() {
    const group: any = {};

    this.ingredients.forEach((item: any) => {
      item.prices.forEach((price: any) => {
        group[`${price.id}_seller`] = new FormControl(price.seller);
        group[`${price.id}_price`] = new FormControl(this.round(price.price * this.currency.rate));
        this.changes[`${price.id}_price`] = false;
        this.changes[`${price.id}_price`] = false;
      });
      group[`new_${item.id}_seller`] = new FormControl();
      group[`new_${item.id}_price`] = new FormControl();
    });

    return new FormGroup(group);
  }

  getValueChanges() {
    this.ingredients.forEach((item: any) => {
      item.prices.forEach((price: any) => {

        this.subscriptions.push(
          this.form.controls[`${price.id}_price`].valueChanges.subscribe(
            value => this.updateOnValue(price.price, value, `${price.id}_price`)
          )
        );

        this.subscriptions.push(
          this.form.controls[`${price.id}_seller`].valueChanges.subscribe(
            value => this.updateOnValue(price.seller, value, `${price.id}_seller`)
          )
        );
      });
    });
  }

  updateOnValue(initial: any, value: any, key: any) {
    if(value){
      if(typeof value == "number"){
        this.changes[key] = !((initial * this.currency.rate - 0.1) <= value && value <= (initial * this.currency.rate + 0.1))
      }else{
        this.changes[key] = value != initial;
      }
    }
  }

  onClickDeletePrice(idPrice: number, indexIngredient: number){
    this.subscriptions.push(
      this.ingredientPriceService.deleteIngredientPrice(idPrice).subscribe(
        () => {

          let newPrices = this.ingredients[indexIngredient].prices
          const found = newPrices.find((price: any) => price.id == idPrice)
          if(found) {
            newPrices.splice(newPrices.indexOf(found), 1)
          }
          this.ingredients[indexIngredient].prices = newPrices

          this.form.removeControl(`${idPrice}_seller`)
          this.form.removeControl(`${idPrice}_price`)
          this.table.forEach(table => table.renderRows());
        }
      )
    )
  }
  onClickUpdatePrice(id: number){
    let newPrice = this.form.controls[`${id}_price`].value
    let newSeller = this.form.controls[`${id}_seller`].value
    if(newPrice && newSeller){
      this.subscriptions.push(
        this.ingredientPriceService.patchIngredientPrice(id, newSeller, this.round(newPrice / this.currency.rate)).subscribe(
          () => {
            this.changes[`${id}_seller`] = false;
            this.changes[`${id}_price`] = false;
          }
        )
      )
    }
  }

  onClickAddPrice(id: number) {
    let newPrice = this.round(this.form.controls[`new_${id}_price`].value / this.currency.rate);
    let newSeller = this.form.controls[`new_${id}_seller`].value;

    if(newPrice && newSeller){
      this.subscriptions.push(
        this.ingredientPriceService.postIngredientPrice(newSeller, newPrice, id).subscribe(
          (data: any) => {
            let index = this.ingredients.indexOf(
              this.ingredients.find(ingr => ingr.id == id)
            );
            this.ingredients[index].prices.push(data);
            this.form = this._formBuilder.record({
                ...this.form.controls,
                [`${data.id}_seller`]: new FormControl(newSeller),
                [`${data.id}_price`]: new FormControl(this.form.controls[`new_${id}_price`].value)
              }
            );
            this.changes[`${id}_seller`] = false;
            this.changes[`${id}_price`] = false;

            this.form.controls[`new_${id}_price`].setValue(null);
            this.form.controls[`new_${id}_seller`].setValue(null);

            this.table.forEach(table => table.renderRows());
          }
        )
      );
    }
  }

  round(item: number){
    return Math.round(item * 100) / 100
  }

  changeTotal() {
      this.ingredients.forEach((item: any) => {
        item.prices.forEach((price: any) => {
          this.form.controls[`${price.id}_price`].setValue(this.round(price.price * this.currency.rate));
        });
      });
  }

  filterOnEnter(event: KeyboardEvent) {
    if (event.code === 'Enter' && this.newIngredientForm.value) {
      this.filteredIngredients = this.filterService.getIngredientsByFilter(this.newIngredientForm.value);
    }
  }

  onSelectNewIngredient() {
    this.filteredIngredients.pipe(take(1)).subscribe(
      filtered => {
        const found = filtered.find(item => item.name == this.newIngredientForm.value)
        found.prices = [];
        this.ingredients.push(found);

        this.form = this._formBuilder.record({
            ...this.form.controls,
          [`new_${found.id}_seller`]: new FormControl(),
          [`new_${found.id}_price`]: new FormControl()
          }
        );


        this.newIngredientForm.setValue("");
      }
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
