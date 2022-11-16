import { ClienteFormComponent } from './pages/cliente-form/cliente-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListComponent } from './pages/clientes-list/clientes-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ClientesListComponent,
        title: 'AngularApp - Listado de Clientes',
      },
      {
        path: 'page/:page',
        component: ClientesListComponent,
        title: 'AngularApp - Listado de Clientes',
      },
      {
        path: 'nuevo',
        component: ClienteFormComponent,
        title: 'AngularApp - Nuevo Cliente',
      },
      {
        path: 'editar/:id',
        component: ClienteFormComponent,
        title: 'AngularApp - Editar Cliente',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
