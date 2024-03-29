import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Cliente } from '@core/models';
import { ClienteService } from '@modules/clientes/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResponse } from '@core/interfaces';
import { ModalDetalleClienteService } from '@modules/clientes/services/modal-detalle-cliente.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
})
export class ClientesListComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  private _subscriptions = new Subscription();

  paginador!: PaginatedResponse<Cliente>;

  constructor(
    private _clienteService: ClienteService,
    private _modalClienteService: ModalDetalleClienteService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this._route.params.subscribe(({ page }) => {
        if (!page) {
          page = 0;
        }

        this._clienteService.clientes$.subscribe((response) => {
          this.clientes = this.clientes.map((clienteOriginal) => {
            if (response.id == clienteOriginal.id) {
              clienteOriginal.foto = response.foto;
            }

            return clienteOriginal;
          });
        });

        this._clienteService.getCustomers(page).subscribe((response) => {
          this.clientes = response.data;
          this.paginador = response;
        });
      })
    );
  }

  deleteCustomerById(cliente: Cliente, indice: number) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this._subscriptions.add(
          this._clienteService.deleteCustomerById(cliente.id).subscribe(() => {
            this.clientes.splice(indice, 1);
            Swal.fire(
              'Cliente borrado!',
              `El cliente ${cliente.nombre} ${cliente.apellido} ha sido borrado con éxito.`,
              'success'
            );
          })
        );
      }
    });
  }

  openCustomerDetailModal(cliente: Cliente) {
    this._modalClienteService.openModal();
    this._modalClienteService.setCustomerModalData(cliente);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
