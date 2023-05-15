import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import {FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {TopBarModule} from "@app-shared/components/top-bar/top-bar.module";
import {MatSidenavModule} from "@angular/material/sidenav";


@NgModule({
  declarations: [
    LandingComponent,
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FlexModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        TopBarModule,
        MatSidenavModule,
    ]
})
export class HomeModule { }
