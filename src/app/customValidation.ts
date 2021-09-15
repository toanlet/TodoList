
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
export function currentDate(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    return null;
  };
}
