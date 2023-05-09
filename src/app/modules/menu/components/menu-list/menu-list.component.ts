import {Component, OnInit} from '@angular/core';
import {MENUS, SEARCH} from "@app-shared/constants";
import {Router} from "@angular/router";
import {Observable, take} from "rxjs";
import {MenuService} from "../services/menu.service";
import {Menu} from "@app-shared/models/menu.model";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit{

  isEmpty: boolean = false;
  menuObs!: Observable<Menu[]>;

  constructor(private router: Router,
              private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.menuObs = this.menuService.getMenus();
    this.menuObs.pipe(take(1)).subscribe(
      menus =>
        this.isEmpty = !menus.length
    );
  }

  onClickGoToRecipes() {
    this.router.navigateByUrl(SEARCH).then();
  }

  getCategoriesMenu(menu: Menu){
    return Object.keys(menu.recipes);
  }

  onClickGoToMenu(id: number) {
    this.router.navigateByUrl(MENUS + "/" + id).then();
  }

  getNumberRecipes(menu: Menu) {
    let count = 0;
    this.getCategoriesMenu(menu).forEach(category => {
      count += menu.recipes[category].length;
    });
    return count;
  }
}
