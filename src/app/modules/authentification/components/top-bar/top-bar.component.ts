import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {WELCOME} from "../../../../shared/constants";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  constructor(private router: Router) {}

  onClickHome(): void {
    this.router.navigateByUrl(WELCOME).then();
  }

  onClickLogin(): void{
    this.router.navigateByUrl(`${WELCOME}/login`).then();
  }

  onClickRegister(): void{
    this.router.navigateByUrl(`${WELCOME}/register`).then();
  }
}
