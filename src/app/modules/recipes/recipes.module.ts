import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { ContainerComponent } from './components/container/container.component';
import {HomeModule} from "../home/home.module";
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { SearchComponent } from './components/search/search.component';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ContainerComponent,
    RecipePageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    HomeModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
    ExtendedModule
  ]
})
export class RecipesModule { }
