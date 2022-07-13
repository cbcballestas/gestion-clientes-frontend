import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ClientesModule } from './../clientes/clientes.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  exports: [ClientesModule],
})
export class CoreModule {}
