import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Cliente } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private _http: HttpClient) {}

  getCustomers(): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(`${environment.API_URL}/clientes`);
  }
  getCustomerById(id: number): Observable<Cliente> {
    return this._http.get<Cliente>(`${environment.API_URL}/clientes/${id}`);
  }
  saveCustomerData(cliente: Cliente): Observable<Cliente> {
    return this._http.post<Cliente>(`${environment.API_URL}/clientes`, cliente);
  }
  updateCustomerData(id: number, cliente: Cliente): Observable<Cliente> {
    return this._http.put<Cliente>(
      `${environment.API_URL}/clientes/${id}`,
      cliente
    );
  }
  deleteCustomerById(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.API_URL}/clientes/${id}`);
  }
}
