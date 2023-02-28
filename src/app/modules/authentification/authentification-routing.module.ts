import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthentificationContainer} from "./components/container/authentification-container.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {RegisterFormComponent} from "./components/register-form/register-form.component";

const routes: Routes = [
  {
    path: '',
    component: AuthentificationContainer,
    children:[
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginFormComponent
      },
      {
        path: 'register',
        component: RegisterFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
