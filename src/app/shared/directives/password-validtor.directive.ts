import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if ( !control.value ) { // 如果绑定未输入值，则返回 required错误
     return {required: true };
    }
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/;
    const passwordRegExp = new RegExp(reg);
    const correct = !passwordRegExp.test(control.value );
    return correct ? {valid: {value: true}} : null;
   };
}

@Directive({
  selector: '[ysjPasswordValidtor]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidtorDirective,
      multi: true
    }
  ]
})
export class PasswordValidtorDirective {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors{
    // 生成一个函数，然后调用它
    return passwordValidator()(control);
  }

}
