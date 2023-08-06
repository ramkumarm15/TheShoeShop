import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const compare = (
  comapreWith: string,
  toBeCompared: string
): ValidatorFn => {
  return (group: AbstractControl): ValidationErrors | null => {
    const newPassword = group.get(comapreWith);
    const confirmPassword = group.get(toBeCompared);
    confirmPassword?.setErrors(
      newPassword?.value !== confirmPassword.value ? { compare: true } : null
    );
    return newPassword?.value !== confirmPassword?.value
      ? { compare: true }
      : null;
  };
};


