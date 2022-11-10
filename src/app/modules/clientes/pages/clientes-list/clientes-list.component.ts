import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, switchMap, EMPTY, map, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Cliente } from '@core/models';
import { ClienteService } from '@modules/clientes/services/cliente.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
})
export class ClientesListComponent implements OnInit, OnDestroy {
  clientes: Cliente[] = [];
  subscriptions = new Subscription();

  constructor(private _clienteService: ClienteService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this._clienteService
        .getCustomers()
        .subscribe((data) => (this.clientes = data))
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
        this.subscriptions.add(
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
