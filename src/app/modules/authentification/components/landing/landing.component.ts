import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {WELCOME} from "../../../../shared/constants";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  hide = true;
  form: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getErrorMessageEmail(): string {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter an email';
    }

    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword(): string{
    if (this.form.controls['password'].hasError('required')) {
      return 'You must enter a password';
    }

    if(this.form.controls['password'].hasError('minlength')){
      return 'Minimum length is 6';
    }
    return '';
  }

  onSubmit(): void {
    // should get data + send
    console.log(this.form.controls['email'].value);
    console.log(this.form.controls['password'].value);
    this.router.navigateByUrl(`${WELCOME}/register`).then(() => {
      window.location.reload();
    });
  }
}
