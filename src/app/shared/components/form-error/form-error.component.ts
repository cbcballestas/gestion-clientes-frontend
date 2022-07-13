import { FormErrorService } from './../../services/form-error.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css'],
})
export class FormErrorComponent implements OnInit {
  errors: string[] = [];
  flag = false;

  constructor(private _formErrorService: FormErrorService) {}

  ngOnInit(): void {
    this._formErrorService.getFormErrorSubject().subscribe((data) => {
      this.errors = data;
      this.flag = true;
    });
  }
}
