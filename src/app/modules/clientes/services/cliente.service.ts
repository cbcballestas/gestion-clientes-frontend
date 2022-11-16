import { Injectable } from '@angular/core';
import { Observable, EMPTY, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { Cliente } from '@core/models';
import { HttpErrorResponse, PaginatedResponse } from '@core/interfaces';
import { FormErrorService } from '@core/services/form-error.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _formErrorService: FormErrorService
  ) {}

  getCustomers(page: number): Observable<PaginatedResponse<Cliente>> {
    const params = new HttpParams().set('page', page);

    return this._http.get<PaginatedResponse<Cliente>>(
      `${environment.API_URL}/clientes`,
      {
        params,
      }
    );
  }
  getCustomerById(id: number): Observable<Cliente> {
    return this._http
      .get<Cliente>(`${environment.API_URL}/clientes/${id}`)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this._router.navigateByUrl('/clientes');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${error.mensaje}`,
          });
          return EMPTY;
        })
      );
  }
  saveCustomerData(cliente: Cliente): Observable<Cliente> {
    return this._http
      .post<Cliente>(`${environment.API_URL}/clientes`, cliente)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          if (error.errores) {
            this._formErrorService.setErrors(error.errores);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al crear cliente',
              text: `${error.mensaje}`,
            });
          }
          return EMPTY;
        })
      );
  }
  updateCustomerData(id: number, cliente: Cliente): Observable<Cliente> {
    return this._http
      .put<Cliente>(`${environment.API_URL}/clientes/${id}`, cliente)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          if (error.errores) {
            this._formErrorService.setErrors(error.errores);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar cliente',
              text: `${error.mensaje}`,
            });
          }
          return EMPTY;
        })
      );
  }
  deleteCustomerById(id: number): Observable<void> {
    return this._http
      .delete<void>(`${environment.API_URL}/clientes/${id}`)
      .pipe(
        catchError(({ error }: HttpErrorResponse) => {
          this._router.navigateByUrl('/clientes');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${error.mensaje}`,
          });
          console.error(error.mensaje);
          return EMPTY;
        })
      );
  }
}
