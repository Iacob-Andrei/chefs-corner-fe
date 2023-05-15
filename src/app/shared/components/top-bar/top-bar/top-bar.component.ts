import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HOME, RECIPE} from "../../../constants";
import {Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Recipe} from "../../../models";
import {FiltersService} from "../services/filters.service";
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../../../../services/auth/auth.service";
import {Store} from "@ngrx/store";
import {selectCountRecipes} from "../../../../services/store/cart.selectors";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnDestroy{
  subscriptions: Subscription[] = []
  stateCtrl = new FormControl('');
  filteredRecipes!: Observable<Recipe[]>;
  countProduct$: Observable<number>
  @Output() sidenav: EventEmitter<any> = new EventEmitter();

  constructor( private router: Router,
               private filterService: FiltersService,
               public authService: AuthService,
               private store: Store) {
    this.countProduct$ = this.store.select(selectCountRecipes);
  }

  ngOnInit(): void{
  //this.filteredRecipes = this.filterService.getRecipesByFilter('a');
  }

  toggle() {
    this.sidenav.emit();
  }

  onClickGoHome() {
    this.router.navigateByUrl(HOME).then();
  }

  getImageUrl(image: string): string{
    return environment.imageUrl + image;
  }

  filterOnEnter(event: KeyboardEvent) {
    if (event.code === 'Enter' && this.stateCtrl.value) {
      this.filteredRecipes = this.filterService.getRecipesByFilter(this.stateCtrl.value);
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const newPath = RECIPE + event.option.value
    this.router.navigateByUrl(newPath).then();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
