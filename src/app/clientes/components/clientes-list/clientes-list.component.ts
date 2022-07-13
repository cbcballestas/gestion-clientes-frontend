import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ClienteService } from './../../service/cliente.service';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css'],
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientSubject().subscribe(() => {
      this._getClientsList();
    });

    this._getClientsList();
  }

  deleteCustomer(id: number, index: number) {
    Swal.fire({
      title: 'Está seguro de eliminar éste registro?',
      text: 'La operación NO es reversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCustomer(id).subscribe(() => {
          this.clientes.splice(index, 1);
          Swal.fire(
            'Exito!',
            'Registro ha sido eliminado éxitosamente.',
            'success'
          );
        });
      }
    });
  }

  private _getClientsList(): void {
    this.clienteService.getCustomers().subscribe(({ data }) => {
      this.clientes = data.lista;
    });
  }
}
