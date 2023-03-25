import { Component } from '@angular/core';
import {AUTH, HOME, RECIPE, SEARCH} from "../../../constants";
import {Router} from "@angular/router";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  isAuth: boolean = true;

  stateCtrl = new FormControl('');
  states = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];

  filteredStates: Observable<any>;

  constructor( private router: Router) {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => this.states.slice()),
    );
  }

  onClickGoHome() {
    this.router.navigateByUrl(HOME).then();
  }

  onClickGoToRecipes() {
    this.router.navigateByUrl(SEARCH).then();
  }

  onClickLogin() {
    this.router.navigateByUrl(AUTH).then();
  }

  filterOnEnter(event: KeyboardEvent) {
    if (event.code === 'Enter' && this.stateCtrl.value) {

      // TODO: call BE for new observable
      const pattern = this.stateCtrl.value
      this.states = this.states.filter(item => item['name'].includes(pattern))

      this.filteredStates = this.stateCtrl.valueChanges.pipe(
        startWith(''),
        map(state => this.states.slice())
      )
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    // TODO: go to recipe page by id
    // const newPath = RECIPE + event.option.value
    // this.router.navigateByUrl(newPath).then();
  }
}
