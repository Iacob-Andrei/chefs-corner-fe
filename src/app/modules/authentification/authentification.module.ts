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
import {TopBarModule} from "../../shared/components/top-bar/top-bar.module";

@NgModule({
  declarations: [
    AuthentificationContainer,
    LoginFormComponent,
    RegisterFormComponent
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
        TopBarModule
    ]
})
export class AuthentificationModule { }
