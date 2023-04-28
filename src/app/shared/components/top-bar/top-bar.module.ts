import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import {MatButtonModule} from "@angular/material/button";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatBadgeModule} from "@angular/material/badge";



@NgModule({
  declarations: [
    TopBarComponent
  ],
  exports: [
    TopBarComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        FlexModule,
        MatMenuModule,
        MatIconModule,
        MatInputModule,
        ExtendedModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        NgOptimizedImage,
        MatBadgeModule
    ]
})
export class TopBarModule { }
