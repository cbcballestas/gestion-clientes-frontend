import { ClientesAdministrarComponent } from './components/clientes-administrar/clientes-administrar.component';
import { ClientesListComponent } from './components/clientes-list/clientes-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const CLIENTES_ROUTES: Routes = [
  {
    path: '',
    component: ClientesListComponent,
  },
  {
    path: 'nuevo',
    component: ClientesAdministrarComponent,
  },
  {
    path: 'editar/:id',
    component: ClientesAdministrarComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(CLIENTES_ROUTES)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
