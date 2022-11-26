import { Injectable } from '@angular/core';
import { Observable, EMPTY, catchError, Subject } from 'rxjs';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { Cliente } from '@core/models';
import {
  HttpErrorResponse,
  PaginatedResponse,
  UploadedProfilePhotoDTO,
} from '@core/interfaces';
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

  private clienteObservable: Subject<Cliente> = new Subject();
  clientes$ = this.clienteObservable.asObservable();

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

  uploadProfilePhoto(
    archivo: File,
    id: number
  ): Observable<HttpEvent<UploadedProfilePhotoDTO>> {
    // Se asignan los valores requeridos por el API
    let formData: FormData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', '' + id);

    const req = new HttpRequest(
      'POST',
      `${environment.API_URL}/clientes/upload`,
      formData,
      {
        reportProgress: true,
      }
    );

    return this._http.request<UploadedProfilePhotoDTO>(req);
  }

  notifiyCustomerList(cliente: Cliente): void {
    this.clienteObservable.next(cliente);
  }
}
