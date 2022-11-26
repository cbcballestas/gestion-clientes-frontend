import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'profilePhoto',
})
export class ProfilePhotoPipe implements PipeTransform {
  private _endpointUrl = `${environment.API_URL}/clientes/img`;
  private _staticResourceUrl = `${environment.STATIC_RESOURCES_URL}`;

  transform(value?: string): string {
    return value != null
      ? `${this._endpointUrl}?foto=${value}`
      : `${this._staticResourceUrl}/images/no-usuario.png`;
  }
}
