import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Cliente } from '@core/models';
import { ClienteService } from '@modules/clientes/services/cliente.service';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css'],
})
export class ClienteDetailComponent implements OnInit, OnDestroy {
  @ViewChild('foto') input!: ElementRef;

  cliente!: Cliente;

  archivoSeleccionado: File | null = null;

  private _subscriptions: Subscription = new Subscription();
  private _id!: number;

  titulo: string = 'Detalle cliente';

  constructor(
    private _clienteService: ClienteService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this._route.params.subscribe((data) => {
        this._id = data['id'];

        if (this._id) {
          this._clienteService.getCustomerById(this._id).subscribe((data) => {
            this.cliente = data;
          });
        }
      })
    );
  }

  onSelectFile() {
    this.archivoSeleccionado = this.input.nativeElement.files[0];
    if (this.archivoSeleccionado!.type.indexOf('image') < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Debe seleccionar una imágen válida`,
      });
      this._resetFileInput();
    }
  }

  uploadProfilePhoto() {
    if (!this.archivoSeleccionado) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Debe seleccionar una imágen válida`,
      });
      this._resetFileInput();
      return;
    }

    this._clienteService
      .uploadProfilePhoto(this.archivoSeleccionado!, this._id)
      .subscribe((data) => {
        this.cliente = data.cliente;
        Swal.fire({
          icon: 'success',
          title: 'Archivo cargado',
          text: `${data.mensaje}: ${this.cliente.foto}`,
        });
        this._resetFileInput();
      });
  }

  private _resetFileInput(): void {
    this.archivoSeleccionado = null;
    this.input.nativeElement.value = null;
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
