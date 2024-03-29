import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import {AuthentificationContainer} from "./components/container/authentification-container.component";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {RegisterFormComponent} from "./components/register-form/register-form.component";
import {MatMenuModule} from "@angular/material/menu";
import {TopBarModule} from "@app-shared/components/top-bar/top-bar.module";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSidenavModule} from "@angular/material/sidenav";
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AuthentificationContainer,
    LoginFormComponent,
    RegisterFormComponent,
    ConfirmationComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    FlexModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    ExtendedModule,
    MatMenuModule,
    TopBarModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSidenavModule
  ]
})
export class AuthentificationModule { }
