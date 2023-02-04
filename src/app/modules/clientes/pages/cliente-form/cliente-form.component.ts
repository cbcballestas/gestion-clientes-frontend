import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, switchMap, Subscription, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import * as moment from 'moment';

import { Cliente, Region } from '@core/models';
import { ClienteService } from '@modules/clientes/services/cliente.service';
import { RegionesService } from '@core/services/regiones.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
})
export class ClienteFormComponent implements OnInit, OnDestroy {
  titulo: string = 'Nuevo Cliente';
  edicion: boolean = false;
  id!: number;

  regiones$!: Observable<Region[]>;

  private _subscriptions$ = new Subscription();

  form = this._fb.nonNullable.group({
    id: [0],
    nombre: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(60)],
    ],
    apellido: ['', [Validators.required]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
      ],
    ],
    fechaNacimiento: ['', [Validators.required]],
    region: new FormControl<Region | null>(null, [Validators.required]),
    foto: [undefined],
  });

  constructor(
    private _clienteService: ClienteService,
    private _regionService: RegionesService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._subscriptions$.add(
      this._route.params.subscribe(({ id }) => {
        if (id) {
          this.titulo = 'Editar Cliente';
          this.edicion = true;
          this.id = id;

          //Se realiza la búsqueda del cliente por el ID suministrado

          this._clienteService
            .getCustomerById(id)
            .subscribe((cliente) => this._loadFormValues(cliente));
        }
      })
    );
    this.regiones$ = this._regionService.getAllRegions();
  }

  compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === null && o2 === null) {
      return true;
    }

    return o1 === null || o2 === null ? false : o1.id === o2.id;
  }

  procesar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.controls.fechaNacimiento.setValue(
      moment(this.form.controls.fechaNacimiento.value).format('YYYY-MM-DD')
    );

    if (this.edicion) {
      this._subscriptions$.add(
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
      this._subscriptions$.add(
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
      fechaNacimiento: cliente.fechaNacimiento,
      region: cliente.region,
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
  get fechaNacimiento() {
    return this.form.controls.fechaNacimiento;
  }

  get region() {
    return this.form.controls.region;
  }

  ngOnDestroy(): void {
    this._subscriptions$.unsubscribe();
  }
}
