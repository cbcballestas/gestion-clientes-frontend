import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'profilePhoto',
})
export class ProfilePhotoPipe implements PipeTransform {
  private _endpointUrl = `${environment.API_URL}/clientes/img`;

  transform(value?: string): string {
    return `${this._endpointUrl}?foto=${value}`;
  }
}
