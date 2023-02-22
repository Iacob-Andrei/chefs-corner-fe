import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PagenotfoundComponent} from "./modules/pagenotfound/pagenotfound.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import("./modules/authentification/authentification.module").then((m) => m.AuthentificationModule)
  },
  {
    path: 'home',
    loadChildren: () => import("./modules/home/home.module").then((m)=>m.HomeModule)
  },
  {
    path: 'recipe',
    loadChildren: () => import("./modules/recipes/recipes.module").then((m) => m.RecipesModule)
  },
  {
    path: '**',
    pathMatch: "full",
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
