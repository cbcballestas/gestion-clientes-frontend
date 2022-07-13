import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormErrorService {
  private _formErrorSubject = new Subject<string[]>();

  constructor() {}

  getFormErrorSubject() {
    return this._formErrorSubject.asObservable();
  }

  setFormErrorSubject(value: string[]) {
    this._formErrorSubject.next(value);
  }
}
