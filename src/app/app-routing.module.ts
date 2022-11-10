import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clientes',
    pathMatch: 'full',
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./modules/clientes/clientes.module').then(
        (m) => m.ClientesModule
      ),
  },
  {
    path: 'directivas',
    loadChildren: () =>
      import('./modules/directiva/directiva.module').then(
        (m) => m.DirectivaModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
