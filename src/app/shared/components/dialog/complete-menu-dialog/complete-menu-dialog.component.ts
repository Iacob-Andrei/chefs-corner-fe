import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MenuService} from "../../../../modules/menu/services/menu.service";
import {take} from "rxjs";

@Component({
  selector: 'app-complete-menu-dialog',
  templateUrl: './complete-menu-dialog.component.html',
  styleUrls: ['./complete-menu-dialog.component.scss']
})
export class CompleteMenuDialogComponent {
  form: FormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required]})

  constructor(private _formBuilder: FormBuilder,
              private menuService: MenuService) {}

  onClickGetRequest() {
    this.menuService.postMenu(this.form.controls['name'].value, this.form.controls['description'].value)
      .pipe(take(1)).subscribe(
      () => window.location.reload()
    )
  }
}
