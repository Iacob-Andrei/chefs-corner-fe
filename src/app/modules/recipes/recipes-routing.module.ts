import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContainerComponent} from "./components/container/container.component";
import {RecipePageComponent} from "./components/recipe-page/recipe-page.component";
import {SearchComponent} from "./components/search/search.component";

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children:[
      {
        path: ':id',
        component: RecipePageComponent
      },
      {
        path: 'search',
        component: SearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
