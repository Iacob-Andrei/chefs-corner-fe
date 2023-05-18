import { Component } from '@angular/core';
import {AUTH} from "@app-shared/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

  constructor(private router: Router){}

  onClickGoLogin() {
    this.router.navigateByUrl(`${AUTH}/login`).then();
  }
}
