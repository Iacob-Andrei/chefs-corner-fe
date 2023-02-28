import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { SearchComponent } from './components/search/search.component';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TopBarModule} from "../../shared/components/top-bar/top-bar.module";


@NgModule({
  declarations: [
    ContainerComponent,
    RecipePageComponent,
    SearchComponent
  ],
    imports: [
        CommonModule,
        RecipesRoutingModule,
        FlexModule,
        MatButtonModule,
        MatIconModule,
        ExtendedModule,
        TopBarModule
    ]
})
export class RecipesModule { }
