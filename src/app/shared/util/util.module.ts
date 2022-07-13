import { FormErrorComponent } from './../components/form-error/form-error.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [FormErrorComponent],
  exports: [ReactiveFormsModule, FormErrorComponent],
})
export class UtilModule {}
