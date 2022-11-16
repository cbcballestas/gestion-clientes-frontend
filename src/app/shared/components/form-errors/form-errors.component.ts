import { Component, OnInit } from '@angular/core';
import { FormErrorService } from '@core/services/form-error.service';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
})
export class FormErrorsComponent implements OnInit {
  isAlertEnabled: boolean = false;
  errores!: string[];

  constructor(private _formErrorService: FormErrorService) {}

  ngOnInit(): void {
    this._formErrorService.errores$.subscribe((data) => {
      if (data.length > 0) {
        this.isAlertEnabled = true;
        this.errores = data;
      }
    });
  }
}
