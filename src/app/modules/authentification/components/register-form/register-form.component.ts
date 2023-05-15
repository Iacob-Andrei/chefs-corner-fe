import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatchPasswords} from "../../validators/match-passwords";
import {StepperOrientation} from "@angular/cdk/stepper";
import {map, Observable, Subscription} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {getErrorMessageEmail, getErrorMessagePassword, getErrorMsgRequiredValue} from "../../validators/error-messages";
import {AUTH, HOME} from "@app-shared/constants";
import {AuthService} from "../../../../services/auth/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnDestroy{
  subscriptions: Subscription[] = []
  hidePassword = true;
  hideConfirmPassword = true;
  getErrorMsgRequired = getErrorMsgRequiredValue;
  getErrorMsgEmail = getErrorMessageEmail;
  getErrorMsgPwd = getErrorMessagePassword;
  fileName = '';
  image: File | undefined;
  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    accountType: [false, Validators.required]
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
              breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              public toaster: ToastrService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  onBackRegister() {
    this.router.navigateByUrl(HOME).then();
  }

  onConfirmClick() {
    if(this.firstFormGroup.value.accountType !== null){
      this.subscriptions.push(
        this.authService.register(
          `${this.firstFormGroup.value.firstName} ${this.firstFormGroup.value.lastName}`,
          `${this.secondFormGroup.value.email}`,
          `${this.thirdFormGroup.value.password}`,
          this.firstFormGroup.value.accountType
        ).subscribe(
          () =>
            this.patchImage()
        )
      )
    }
  }

  patchImage(){
    if(!this.image) return;

    this.subscriptions.push(
      this.authService.patchImage(
        `${this.secondFormGroup.value.email}`,
        this.image
      ).subscribe(() => {
          this.router.navigateByUrl(HOME).then();
      },
        () => {
          this.showErrorToaster("Error while uploading image", "Re-upload image in the user settings.");
          this.router.navigateByUrl(HOME).then();
        })
    )
  }

  showErrorToaster(title: string, message: string): void{
    this.toaster.error(message, title, {});
  }

  onClickGoRegistration() {
    this.router.navigateByUrl(`${AUTH}/login`).then();
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
    if (this.image) {
      this.fileName = this.image.name;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
