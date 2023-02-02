import {Component} from '@angular/core';
import { FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {WELCOME} from "../../../../shared/constants";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(private router: Router) {}

  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  goToRegisterWithData(): void {
    // should get data + send
    this.router.navigateByUrl(`${WELCOME}/register`).then();
  }
}
