import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { ContainerComponent } from './components/container/container.component';
import {TopBarModule} from "@app-shared/components/top-bar/top-bar.module";


@NgModule({
  declarations: [
    CartComponent,
    ContainerComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    TopBarModule
  ]
})
export class MenuModule { }
