import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from "./components/cart/cart.component";
import {ContainerComponent} from "./components/container/container.component";
import {MenuListComponent} from "./components/menu-list/menu-list.component";
import {MenuPageComponent} from "./components/menu-page/menu-page.component";

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'cart',
        component: CartComponent,
        pathMatch: 'full',
      },
      {
        path: '',
        component: MenuListComponent,
        pathMatch: 'full',
      },
      {
        path: ':id',
        component: MenuPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
