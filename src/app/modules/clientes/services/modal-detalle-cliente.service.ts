import { Injectable } from '@angular/core';
import { Cliente } from '@core/models';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalDetalleClienteService {
  private clienteObservable: Subject<Cliente | null> = new Subject();

  cliente$ = this.clienteObservable.asObservable();
  isModalOpened: boolean = false;

  constructor() {}

  setCustomerModalData(cliente: Cliente | null) {
    this.clienteObservable.next(cliente);
  }

  openModal(): void {
    this.isModalOpened = true;
  }
  closeModal(): void {
    this.isModalOpened = false;
  }
}
