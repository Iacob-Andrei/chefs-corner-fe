import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-recipe-menu-dialog',
  templateUrl: './recipe-menu-dialog.component.html',
  styleUrls: ['./recipe-menu-dialog.component.scss']
})
export class RecipeMenuDialogComponent implements OnInit{

  menus!: any[];
  menu!: any;
  category!: any;
  categories!: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<RecipeMenuDialogComponent>) {}

  ngOnInit(): void {
    this.menus = this.data.menus;
    this.categories = this.data.categories;
  }

  onClickAddToMenu() {
    if(this.menu && this.category) {
      this.dialogRef.close({
        idMenu: this.menu.id,
        category: this.category
      })
    }
  }
}
