import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import {AuthentificationContainer} from "./components/container/authentification-container.component";
import {TopBarComponent} from "./components/top-bar/top-bar.component";
import {LandingComponent} from "./components/landing/landing.component";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {GoogleFormComponent} from "../../shared/components/google-form/google-form.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {RegisterFormComponent} from "./components/register-form/register-form.component";

@NgModule({
  declarations: [
    AuthentificationContainer,
    TopBarComponent,
    LandingComponent,
    LoginFormComponent,
    RegisterFormComponent,
    GoogleFormComponent
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    FlexModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class AuthentificationModule { }
