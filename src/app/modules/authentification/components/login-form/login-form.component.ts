import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AUTH, HOME} from "../../../../shared/constants";
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  form: FormGroup;
  hide = true;

  constructor(private router: Router,
              private fb: FormBuilder,
              private service: AuthService) {
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

  onClickSubmit(): void {
    this.service.login(
      this.form.controls['email'].value,
      this.form.controls['password'].value
    ).subscribe(result => {
        this.router.navigateByUrl(HOME).then();
      },
      error => {
        console.log(error)
      }
    );
  }

  onClickGoRegistration(): void{
    this.router.navigateByUrl(`${AUTH}/register`).then();
  }
}
