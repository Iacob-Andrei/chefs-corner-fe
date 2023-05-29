import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceDialogComponent } from './price-dialog/price-dialog.component';
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddPermissionDialogComponent } from './add-permission-dialog/add-permission-dialog.component';
import { AskPermissionDialogComponent } from './ask-permission-dialog/ask-permission-dialog.component';
import { DeleteConfDialogComponent } from './delete-conf-dialog/delete-conf-dialog.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import { CompleteMenuDialogComponent } from './complete-menu-dialog/complete-menu-dialog.component';
import { GetRecipesDialogComponent } from './get-recipes-dialog/get-recipes-dialog.component';



@NgModule({
  declarations: [
    PriceDialogComponent,
    AddPermissionDialogComponent,
    AskPermissionDialogComponent,
    DeleteConfDialogComponent,
    CompleteMenuDialogComponent,
    GetRecipesDialogComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
  ]
})
export class DialogModule { }
