import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {GetRecipesDialogComponent} from "../get-recipes-dialog/get-recipes-dialog.component";

@Component({
  selector: 'app-complete-menu-dialog',
  templateUrl: './complete-menu-dialog.component.html',
  styleUrls: ['./complete-menu-dialog.component.scss']
})
export class CompleteMenuDialogComponent {

  form: FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required]})

  constructor(public dialogRef: MatDialogRef<GetRecipesDialogComponent>,
              private _formBuilder: FormBuilder) {}

  onClickGetRequest() {
    this.dialogRef.close({
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value
    })
  }
}
