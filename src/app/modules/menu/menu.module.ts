import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { ContainerComponent } from './components/container/container.component';
import {TopBarModule} from "@app-shared/components/top-bar/top-bar.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PriceMenuDialogComponent } from './components/dialog/price-menu-dialog/price-menu-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { GetRecipesDialogComponent } from './components/dialog/get-recipes-dialog/get-recipes-dialog.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { MenuListComponent } from './components/menu-list/menu-list.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { MenuPageComponent } from './components/menu-page/menu-page.component';
import { CompleteMenuDialogComponent } from './components/dialog/complete-menu-dialog/complete-menu-dialog.component';


@NgModule({
  declarations: [
    CartComponent,
    ContainerComponent,
    PriceMenuDialogComponent,
    GetRecipesDialogComponent,
    MenuListComponent,
    MenuPageComponent,
    CompleteMenuDialogComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    TopBarModule,
    MatIconModule,
    MatButtonModule,
    FlexModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatExpansionModule
  ]
})
export class MenuModule { }
