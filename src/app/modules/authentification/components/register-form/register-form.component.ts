import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatchPasswords} from "../../validators/match-passwords";
import {StepperOrientation} from "@angular/cdk/stepper";
import {map, Observable} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {getErrorMessageEmail, getErrorMessagePassword, getErrorMsgRequiredValue} from "../../validators/error-messages";
import {AUTH, HOME} from "../../../../shared/constants";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  hidePassword = true;
  hideConfirmPassword = true;
  getErrorMsgRequired = getErrorMsgRequiredValue;
  getErrorMsgEmail = getErrorMessageEmail;
  getErrorMsgPwd = getErrorMessagePassword;

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  thirdFormGroup = this._formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', []],
  },
    {validators: MatchPasswords}
  );
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  onBackRegister() {
    this.router.navigateByUrl(HOME).then();
  }

  onConfirmClick() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
  }

  onClickGoRegistration() {
    this.router.navigateByUrl(`${AUTH}/login`).then();
  }
}
