import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';

import { Cliente } from '@core/models';
import { ClienteService } from '@modules/clientes/services/cliente.service';
import { ModalDetalleClienteService } from '@modules/clientes/services/modal-detalle-cliente.service';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css'],
})
export class ClienteDetailComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('foto') input!: ElementRef;

  cliente?: Cliente;
  archivoSeleccionado: File | null = null;
  progreso: number = 0;

  private _subscriptions: Subscription = new Subscription();

  titulo: string = 'Detalle cliente';

  constructor(
    private _clienteService: ClienteService,
    public modalDetalleClienteService: ModalDetalleClienteService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this._loadCustomerData();
  }

  onSelectFile() {
    this.archivoSeleccionado = this.input.nativeElement.files[0];
    this.progreso = 0;
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
      .uploadProfilePhoto(this.archivoSeleccionado!, this.cliente!.id)
      .subscribe((event) => {
        /**
         * HttpEventType.UploadProgress: para mostrar el progreso de la carga del archivo
         * HttpEventType.Response: para verificar si ya terminó la carga del archivo
         */

        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.progreso = event.total
              ? Math.round((100 * event.loaded) / event.total)
              : 100;
            break;

          case HttpEventType.Response:
            this.cliente = event.body?.cliente;
            Swal.fire({
              icon: 'success',
              title: 'Archivo cargado',
              text: `${event.body?.mensaje}: ${this.cliente?.foto}`,
            });
            this._clienteService.notifiyCustomerList(this.cliente!);
            break;
        }

        this._resetFileInput();
      });
  }

  closeCustomerDetailModal(): void {
    this.modalDetalleClienteService.closeModal();
    this.modalDetalleClienteService.setCustomerModalData(null);
    this.progreso = 0;
    this._resetFileInput();
  }

  private _resetFileInput(): void {
    this.archivoSeleccionado = null;
    this.input.nativeElement.value = null;
  }

  private _loadCustomerData(): void {
    this.modalDetalleClienteService.cliente$.subscribe(
      (data) => (this.cliente = data!)
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
