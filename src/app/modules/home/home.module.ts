import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    LandingComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ExtendedModule
  ]
})
export class HomeModule { }
