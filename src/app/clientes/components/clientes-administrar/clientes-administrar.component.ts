import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

import { ClienteService } from './../../service/cliente.service';

@Component({
  selector: 'app-clientes-administrar',
  templateUrl: './clientes-administrar.component.html',
  styleUrls: ['./clientes-administrar.component.css'],
})
export class ClientesAdministrarComponent implements OnInit {
  titulo = 'Registrar Cliente';

  // AJUSTES FORMULARIO
  form: FormGroup;
  id: number;
  edicion = false;

  constructor(
    private _clienteService: ClienteService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._buildForm();
  }

  ngOnInit(): void {
    /**
     * Se obtienen los parámetos de la URL (para verificar si se va a editar un registro).
     * en caso de que se requiera editar, se procederá a realizar la consulta y cargar
     * los datos obtenidos en el formulario
     */

    this._route.params.subscribe((param) => {
      // Se verifica si la URL contiene el parámetro id (para cargar los datos del registro)
      this.id = param['id'];
      this.edicion = this.id != null;

      if (this.edicion) {
        this.titulo = 'Editar Registro';
        this._initForm();
      }
    });
  }

  procesar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Se verifica si se está guardando ó editando un registro
    if (this.edicion) {
      this._clienteService
        .updateCustomer(this.id, this.form.value)
        .pipe(
          switchMap((data) => {
            Swal.fire('Exito!', data.mensaje, 'success');

            this._clienteService.setClientSubject();
            this._router.navigateByUrl('/clientes');
            return EMPTY;
          })
        )
        .subscribe();
    } else {
      this._clienteService
        .saveCustomer(this.form.value)
        .pipe(
          switchMap((data) => {
            Swal.fire('Exito!', data.mensaje, 'success');

            this._clienteService.setClientSubject();
            this._router.navigateByUrl('/clientes');
            return EMPTY;
          })
        )
        .subscribe();
    }
  }

  private _initForm(): void {
    this._clienteService
      .getCustomerById(this.id)
      .subscribe(({ data }) => this.form.setValue(data));
  }

  private _buildForm(): void {
    this.form = this._fb.group({
      id: [0],
      nombre: [null, [Validators.required, Validators.minLength(3)]],
      apellido: [null, [Validators.required, Validators.minLength(4)]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      createAt: [null],
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }
  get apellido() {
    return this.form.get('apellido');
  }
  get email() {
    return this.form.get('email');
  }
}
