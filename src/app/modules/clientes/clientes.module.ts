import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListComponent } from './pages/clientes-list/clientes-list.component';
import { ClienteFormComponent } from './pages/cliente-form/cliente-form.component';
import { FormErrorsModule } from '@shared/components/form-errors/form-errors.module';
import { PaginatorModule } from '@shared/components/paginator/paginator.module';

@NgModule({
  declarations: [ClientesListComponent, ClienteFormComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    FormErrorsModule,
    PaginatorModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
  ],
  exports: [ClientesListComponent],
})
export class ClientesModule {}
