import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivaRoutingModule } from './directiva-routing.module';
import { DirectivaPageComponent } from './pages/directiva-page/directiva-page.component';

@NgModule({
  declarations: [DirectivaPageComponent],
  imports: [CommonModule, DirectivaRoutingModule],
  exports: [DirectivaPageComponent],
})
export class DirectivaModule {}
