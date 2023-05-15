import {Component, OnInit} from '@angular/core';
import {CATEGORIES} from "@app-shared/constants";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-get-recipes-dialog',
  templateUrl: './get-recipes-dialog.component.html',
  styleUrls: ['./get-recipes-dialog.component.scss']
})
export class GetRecipesDialogComponent implements OnInit{

  protected readonly CATEGORIES = CATEGORIES;
  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<GetRecipesDialogComponent>) {
  }

  ngOnInit(): void {
    const group: any = {};
    CATEGORIES.forEach(category => {
      if(category.display !== 'Others' && category.display !== 'Everything')
        group[category.display] = new FormControl();
    });
    this.form = new FormGroup(group);
  }

  onClickGetRequest() {
    let total: number = 0;
    let request: any = {};

    CATEGORIES.forEach(category => {
      if(category.display !== 'Others' && category.display !== 'Everything') {
        if(this.form.controls[category.display].value && this.form.controls[category.display].value !== 0) {
          request[category.display] = this.form.controls[category.display].value;
          total += this.form.controls[category.display].value;
        }
      }
    });
    this.dialogRef.close({
      total: total,
      requested: request
    })
  }
}
