import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import {FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";


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
    MatIconModule
  ]
})
export class HomeModule { }
