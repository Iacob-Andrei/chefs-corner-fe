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


@NgModule({
  declarations: [
    CartComponent,
    ContainerComponent,
    PriceMenuDialogComponent
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
    ReactiveFormsModule
  ]
})
export class MenuModule { }
