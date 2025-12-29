
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class BaseComponent {

  public API_URL = localStorage.getItem('appBaseUrl');
  public UI_URL = localStorage.getItem('uiBaseUrl');


  hasError(form: FormGroup, controlName: string, errorType?: string): boolean {
    const control = form.get(controlName);

    if (!control) return false;

    if (errorType) return control.hasError(errorType) && (control.dirty || control.touched);

    return control.invalid && (control.dirty || control.touched);
  }

  getError(form: FormGroup, controlName: string): string | null {
    const control = form.get(controlName);
    if (!control || !control.errors) return null;

    if (control.hasError('required')) return 'This field is required';
    if (control.hasError('email')) return 'Invalid email format';
    if (control.hasError('minlength')) return `Minimum ${control.getError('minlength').requiredLength} characters`;
    if (control.hasError('maxlength')) return `Maximum ${control.getError('maxlength').requiredLength} characters`;
    if (control.hasError('pattern')) return 'Invalid format';

    return 'Invalid';
  }
}
