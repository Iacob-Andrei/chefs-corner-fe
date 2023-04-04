import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { ContainerComponent } from './components/container/container.component';
import {RecipePageComponent} from './components/recipe-page/recipe-page.component';
import { SearchComponent } from './components/search/search.component';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TopBarModule} from "../../shared/components/top-bar/top-bar.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import { PriceDialogComponent } from './components/price-dialog/price-dialog.component';


@NgModule({
  declarations: [
    ContainerComponent,
    RecipePageComponent,
    SearchComponent,
    PriceDialogComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
    ExtendedModule,
    TopBarModule,
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class RecipesModule { }
