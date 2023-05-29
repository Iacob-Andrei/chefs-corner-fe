import {Component, Inject, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {IngredientPriceService} from "../../../services/ingredient-price.service";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-price-dialog',
  templateUrl: './price-dialog.component.html',
  styleUrls: ['./price-dialog.component.scss']
})
export class PriceDialogComponent implements OnInit, OnDestroy{
  subscriptions: Subscription[] = []
  ingredients!: any[];
  quantities!: any;
  totalPrice = 0;
  extra = 0;
  tax =  75;
  percentages = [
    {"procent": 40, "view": "40%"},
    {"procent": 50, "view": "50%"},
    {"procent": 75, "view": "75%"},
    {"procent": 100, "view": "100%"},
  ]

  currency!: any;
  currencies = [
    {"currency": 'RON', "rate": 1},
    {"currency": 'EUR', "rate": 1},
    {"currency": 'USD', "rate": 1},
  ]

  displayedColumns: string[] = ['seller-name', 'seller-price', 'actions'];
  form! : FormGroup;
  changes: any = {};

  @ViewChildren(MatTable) table!:   QueryList<MatTable<any>>;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ingredientPriceService: IngredientPriceService) { }

  ngOnInit(): void {
    this.ingredients = this.data.ingredients;
    this.quantities = this.data.quantities;
    this.currencies[0].rate = this.data.rates.RON;
    this.currencies[1].rate = this.data.rates.EUR;
    this.currencies[2].rate = this.data.rates.USD;
    this.currency = this.currencies[0];

    this.changeTotal();
    this.form = this.createForm();
    this.getValueChanges();
  }

  getProduct(value1: number, value2: number): number{
    return Math.round(value1 * value2 * this.currency.rate * 100) / 100
  }

  getPriceWithConversion(priceUSD: number){
    return priceUSD * this.currency.rate;
  }

  getIngredientActualAmount(id: string): number{
    const key = id + "_amount"
    return this.quantities[key].value;
  }

  changeTotal() {
    this.totalPrice = 0;
    this.ingredients.forEach(item => this.totalPrice += this.getIngredientActualAmount(item.id) * item.price_per_unit);
    this.totalPrice = this.totalPrice * this.currency.rate;
    this.extra = this.totalPrice * (this.tax + 100) / 100;
  }

  createForm() {
    const group: any = {};

    this.ingredients.forEach((item: any) => {
      item.prices.forEach((price: any) => {
        group[`${price.id}_seller`] = new FormControl(price.seller);
        group[`${price.id}_price`] = new FormControl(price.price);
        this.changes[`${price.id}_price`] = false;
        this.changes[`${price.id}_price`] = false;
      });
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
      this.changes[key] = value != initial;
    }
  }

  onClickUpdatePrice(id: number){
    let newPrice = this.form.controls[`${id}_price`].value
    let newSeller = this.form.controls[`${id}_seller`].value
    if(newPrice && newSeller){
      this.subscriptions.push(
        this.ingredientPriceService.patchIngredientPrice(id, newSeller, newPrice).subscribe(
          () => {
            this.changes[`${id}_seller`] = false;
            this.changes[`${id}_price`] = false;
          }
        )
      )
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
