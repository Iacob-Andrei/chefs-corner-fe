import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const MatchPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password?.value && confirmPassword?.value && password.value === confirmPassword.value) {
    return null;
  }

  return { matchPasswords: true };
};
