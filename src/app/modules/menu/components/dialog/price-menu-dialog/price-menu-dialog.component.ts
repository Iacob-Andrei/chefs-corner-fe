import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-price-menu-dialog',
  templateUrl: './price-menu-dialog.component.html',
  styleUrls: ['./price-menu-dialog.component.scss']
})
export class PriceMenuDialogComponent implements OnInit{
  ingredients!: any[];
  addOns! : number;
  totalPrice: number = 0;
  extra: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.ingredients = this.data.ingredients;
    this.addOns = this.data.addOns;

    this.ingredients.forEach(item => this.totalPrice += item.amount * item.price_per_unit);
    this.totalPrice = Math.round(this.totalPrice * 100) / 100;
    this.extra = Math.round(this.totalPrice * (this.addOns + 100) ) / 100;
  }
}
