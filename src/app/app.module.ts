import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { TopBarComponent } from './authentification/top-bar/top-bar.component';
import { LoginFormComponent } from './authentification/login-form/login-form.component';
import { RegisterFormComponent } from './authentification/register-form/register-form.component';
import { AuthentificationContainer } from './authentification/container/authentification-container.component';
import {FlexModule} from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    TopBarComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AuthentificationContainer,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AuthentificationContainer]
})
export class AppModule { }
