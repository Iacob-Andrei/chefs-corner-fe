import { Component } from '@angular/core';
import {HOME} from "../../../constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  isAuth: boolean = true;

  constructor( private router: Router) {}

  onClickGoHome() {
    this.router.navigateByUrl(HOME).then();
  }
}
