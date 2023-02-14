import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatchPasswords} from "../../validators/match-passwords";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  form: FormGroup;
  hide = true;

  constructor(private router: Router,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', []]
    },
      {validators: MatchPasswords});
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

  getErrorMessageRePassword(): string{
    return this.form.hasError('matchPasswords') ? 'Password does not match' :  '';
  }

  onSubmit(): void {
    // should get data + send
    console.log(this.form.controls['fullName'].value);
    console.log(this.form.controls['email'].value);
    console.log(this.form.controls['password'].value);
    console.log(this.form.controls['rePassword'].value);

    // this.router.navigateByUrl(`${HOME}`).then(() => {
    //   window.location.reload();
    // });
  }
}
