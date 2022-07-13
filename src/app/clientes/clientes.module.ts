import { ClientesRoutingModule } from './clientes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesListComponent } from './components/clientes-list/clientes-list.component';
import { ClientesAdministrarComponent } from './components/clientes-administrar/clientes-administrar.component';
import { UtilModule } from '../shared/util/util.module';

@NgModule({
  declarations: [ClientesListComponent, ClientesAdministrarComponent],
  imports: [CommonModule, ClientesRoutingModule, UtilModule],
  exports: [ClientesListComponent, ClientesAdministrarComponent],
})
export class ClientesModule {}
