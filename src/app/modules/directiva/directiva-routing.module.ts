import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirectivaPageComponent } from './pages/directiva-page/directiva-page.component';

const routes: Routes = [
  {
    path:'',
    component:DirectivaPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectivaRoutingModule { }
