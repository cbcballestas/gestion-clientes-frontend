import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, of, switchMap, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Cliente } from '@core/models';
import { ClienteService } from '@modules/clientes/services/cliente.service';
import { HttpErrorResponse } from '@core/interfaces';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
})
export class ClienteFormComponent implements OnInit, OnDestroy {
  titulo: string = 'Nuevo Cliente';
  edicion: boolean = false;
  id!: number;

  subscriptions = new Subscription();

  form = this._fb.nonNullable.group({
    id: [0],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
      ],
    ],
  });

  constructor(
    private _clienteService: ClienteService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(({ id }) => {
      if (id) {
        this.titulo = 'Editar Cliente';
        this.edicion = true;
        this.id = id;

        //Se realiza la búsqueda del cliente por el ID suministrado
        this.subscriptions.add(
          this._clienteService
            .getCustomerById(id)
            .pipe(
              catchError((error: HttpErrorResponse) => {
                this._router.navigateByUrl('/clientes');
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: `${error.error.mensaje}`,
                });
                return EMPTY;
              })
            )
            .subscribe((cliente) => this._loadFormValues(cliente))
        );
      }
    });
  }

  procesar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.edicion) {
      this.subscriptions.add(
        this._clienteService
          .updateCustomerData(this.id, this.form.getRawValue())
          .pipe(
            switchMap((data) => {
              this._router.navigateByUrl('/clientes');
              Swal.fire({
                icon: 'success',
                title: 'Editar Cliente',
                text: `Cliente ${data.nombre} ${data.apellido} actualizado con éxito`,
              });
              return EMPTY;
            })
          )
          .subscribe()
      );
    } else {
      this.subscriptions.add(
        this._clienteService
          .saveCustomerData(this.form.getRawValue())
          .pipe(
            switchMap((data) => {
              this._router.navigateByUrl('/clientes');
              Swal.fire({
                icon: 'success',
                title: 'Nuevo Cliente',
                text: `Cliente ${data.nombre} ${data.apellido} creado con éxito`,
              });
              return EMPTY;
            })
          )
          .subscribe()
      );
    }
  }

  private _loadFormValues(cliente: Cliente): void {
    this.form.patchValue({
      id: cliente.id,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      email: cliente.email,
    });
  }

  get nombre() {
    return this.form.controls.nombre;
  }
  get apellido() {
    return this.form.controls.apellido;
  }
  get email() {
    return this.form.controls.email;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
