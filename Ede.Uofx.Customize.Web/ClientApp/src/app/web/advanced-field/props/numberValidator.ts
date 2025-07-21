import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createNumberValidatorValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    //驗證輸入10碼數字/^-?(0|[1-9]\d*)?$/
    const validNumber = /^-?(0|[1-9]\d*)?$/.test(value);
    return !validNumber ? { invalidMobile: true } : null;
  }
}
