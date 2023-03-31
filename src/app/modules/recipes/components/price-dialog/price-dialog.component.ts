import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-price-dialog',
  templateUrl: './price-dialog.component.html',
  styleUrls: ['./price-dialog.component.scss']
})
export class PriceDialogComponent implements OnInit{
  ingredients!: any[];
  quantities!: any[];
  totalPrice = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.ingredients = this.data.ingredients;
    this.quantities = this.data.quantities

    this.ingredients.forEach(item => this.totalPrice += item.amount * item.price_per_unit)
    this.totalPrice = Math.round(this.totalPrice * 100) / 100

    console.log(this.ingredients)
    console.log(this.quantities)
  }

  getProduct(value1: number, value2: number): number{
    return Math.round(value1 * value2 * 100) / 100
  }
}
