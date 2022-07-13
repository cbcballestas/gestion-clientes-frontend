import { FormErrorService } from './../../shared/services/form-error.service';
import { ErrorResponse } from './../../shared/util/ErrorResponse';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, EMPTY, throwError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

import { Cliente } from './../model/cliente';
import { ResponseUtil } from '../../shared/util/ResponseUtil';
import { Router } from '@angular/router';
import { MainPaginatedResponse } from '../../shared/util/ResponseUtil';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private clientSubject = new Subject<void>();

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _formErrorService: FormErrorService
  ) {}

  /**
   * Método que se encarga de retornar el listado de los clientes registrados
   * @returns Listado de todos los clientes registrados
   */
  getCustomers(): Observable<MainPaginatedResponse<Cliente>> {
    return this._http.get<MainPaginatedResponse<Cliente>>(
      `${environment.URL_HOST}/clientes`
    );
  }

  /**
   *
   * @param id ID registro a buscar
   * @returns Objeto de tipo cliente con los datos del cliente consultado
   */
  getCustomerById(id: number): Observable<ResponseUtil<Cliente>> {
    return this._http
      .get<ResponseUtil<Cliente>>(`${environment.URL_HOST}/clientes/${id}`)
      .pipe(
        catchError((e) => {
          const { error: errorDetail } = e;
          Swal.fire('Aviso', errorDetail.mensaje, 'error');
          this._router.navigateByUrl('/clientes');
          return EMPTY;
        })
      );
  }

  /**
   * Método que se encarga de guardar los datos de un cliente
   * @param cliente Objeto de tipo Cliente
   * @returns Objeto de tipo Cliente guardado
   */
  saveCustomer(cliente: Cliente): Observable<ResponseUtil<Cliente>> {
    return this._http
      .post<ResponseUtil<Cliente>>(`${environment.URL_HOST}/clientes`, cliente)
      .pipe(
        catchError((e) => {
          const { error: errorDetail } = e;

          if (errorDetail.hasOwnProperty('mensaje')) {
            Swal.fire('Aviso', errorDetail.mensaje, 'error');
            return EMPTY;
          } else {
            /**
             * NOTE: Se envían mensajes de error a través del servicio FormErrorService
             */

            this._formErrorService.setFormErrorSubject(
              Object.values(errorDetail)
            );
          }

          return EMPTY;
        })
      );
  }

  /**
   * Método que se encarga de actualizar los datos de un cliente
   * @param id ID registro a actualizar
   * @param cliente Objeto de tipo Cliente
   * @returns Objeto actualizado
   */
  updateCustomer(
    id: number,
    cliente: Cliente
  ): Observable<ResponseUtil<Cliente>> {
    return this._http.put<ResponseUtil<Cliente>>(
      `${environment.URL_HOST}/clientes/${id}`,
      cliente
    );
  }

  /**
   * Método que se encarga de eliminar un cliente
   * @param id ID registro
   * @returns
   */
  deleteCustomer(id: number): Observable<void> {
    return this._http
      .delete<void>(`${environment.URL_HOST}/clientes/${id}`)
      .pipe(
        catchError((e) => {
          const { error: errorDetail } = e;
          Swal.fire('Aviso', errorDetail.mensaje, 'error');
          this._router.navigateByUrl('/clientes');
          return EMPTY;
        })
      );
  }

  getClientSubject() {
    return this.clientSubject.asObservable();
  }

  setClientSubject() {
    this.clientSubject.next();
  }
}
