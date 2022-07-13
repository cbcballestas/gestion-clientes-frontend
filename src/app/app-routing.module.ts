import { PresentacionComponent } from './presentacion/presentacion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: PresentacionComponent,
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./clientes/clientes-routing.module').then(
        (m) => m.ClientesRoutingModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
