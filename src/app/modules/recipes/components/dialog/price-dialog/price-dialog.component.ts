import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-price-dialog',
  templateUrl: './price-dialog.component.html',
  styleUrls: ['./price-dialog.component.scss']
})
export class PriceDialogComponent implements OnInit{
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.ingredients = this.data.ingredients;
    this.quantities = this.data.quantities;
    this.currencies[0].rate = this.data.rates.RON;
    this.currencies[1].rate = this.data.rates.EUR;
    this.currencies[2].rate = this.data.rates.USD;
    this.currency = this.currencies[0];

    this.changeTotal();
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
}
