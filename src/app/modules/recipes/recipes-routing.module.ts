import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContainerComponent} from "./components/container/container.component";
import {RecipePageComponent} from "./components/recipe-page/recipe-page.component";
import {SearchComponent} from "./components/search/search.component";
import {CreateRecipeComponent} from "./components/create-recipe/create-recipe.component";
import {OwnedComponent} from "./components/owned/owned.component";
import {RecommendationComponent} from "./components/recommendation/recommendation.component";

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search'
      },
      {
        path: 'search',
        component: SearchComponent,
        pathMatch: 'full'
      },
      {
        path: 'search/:type',
        component: SearchComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateRecipeComponent,
        pathMatch: 'full'
      },
      {
        path: 'owned',
        component: OwnedComponent,
        pathMatch: 'full'
      },
      {
        path: 'surprise',
        component: RecommendationComponent,
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: RecipePageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
