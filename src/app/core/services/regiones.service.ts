import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Region } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class RegionesService {
  private _urlEndpoint: string;

  constructor(private _http: HttpClient) {
    this._urlEndpoint = `${environment.API_URL}/regiones`;
  }

  getAllRegions(): Observable<Region[]> {
    return this._http.get<Region[]>(this._urlEndpoint);
  }
}
