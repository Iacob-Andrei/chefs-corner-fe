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
  tax =  15;
  percentages = [
    {"procent": 10, "view": "10%"},
    {"procent": 15, "view": "15%"},
    {"procent": 20, "view": "20%"},
    {"procent": 25, "view": "25%"},
    {"procent": 30, "view": "30%"},
  ]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.ingredients = this.data.ingredients;
    this.quantities = this.data.quantities;

    this.ingredients.forEach(item => this.totalPrice += this.getIngredientActualAmount(item.id) * item.price_per_unit);
    this.totalPrice = Math.round(this.totalPrice * 100) / 100;
    this.extra = Math.round(this.totalPrice * (this.tax + 100) ) / 100;
  }

  getProduct(value1: number, value2: number): number{
    return Math.round(value1 * value2 * 100) / 100
  }

  getIngredientActualAmount(id: string): number{
    const key = id + "_amount"
    return this.quantities[key].value;
  }

  changePercent() {
    this.extra = Math.round(this.totalPrice * (this.tax + 100) ) / 100;
  }
}
