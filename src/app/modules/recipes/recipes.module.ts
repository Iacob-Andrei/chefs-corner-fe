import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { ContainerComponent } from './components/container/container.component';
import {RecipePageComponent} from './components/recipe-page/recipe-page.component';
import { SearchComponent } from './components/search/search.component';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TopBarModule} from "@app-shared/components/top-bar/top-bar.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import { PriceDialogComponent } from './components/dialog/price-dialog/price-dialog.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {OwnedComponent} from "./components/owned/owned.component";
import { DeleteConfDialogComponent } from './components/dialog/delete-conf-dialog/delete-conf-dialog.component';
import { AddPermissionDialogComponent } from './components/dialog/add-permission-dialog/add-permission-dialog.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenavModule} from "@angular/material/sidenav";


@NgModule({
  declarations: [
    ContainerComponent,
    RecipePageComponent,
    SearchComponent,
    PriceDialogComponent,
    CreateRecipeComponent,
    OwnedComponent,
    DeleteConfDialogComponent,
    AddPermissionDialogComponent
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
        MatDialogModule,
        MatStepperModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatSidenavModule
    ]
})
export class RecipesModule { }
