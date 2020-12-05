import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if ( !control.value ) { // 如果绑定未输入值，则返回 required错误
     return {required: true };
    }
    const phoneRegExp = new RegExp('1[3|5|7|8|][0-9]{9}');
    const correct = !phoneRegExp.test(control.value );
    return correct ? {valid: {value: true}} : null;
   };
}

@Directive({
  selector: '[ysjPhoneValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhoneValidatorDirective,
      multi: true
    }
  ]
})
export class PhoneValidatorDirective implements Validator {
  constructor() { }
  validate(control: AbstractControl): ValidationErrors{
    // 生成一个函数，然后调用它
    return phoneNumberValidator()(control);
  }
}
