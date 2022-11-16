import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PaginatedResponse } from '@core/interfaces';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() paginador!: PaginatedResponse<any>;
  paginas: number[] = [];

  desde!: number;
  hasta!: number;

  constructor() {}

  ngOnInit(): void {
    this._initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { paginador: paginadorActualizado } = changes;

    if (paginadorActualizado.previousValue) {
      this._initPaginator();
    }
  }

  private _initPaginator(): void {
    // Se calcula con el mínimo entre dos valores
    this.desde = Math.min(
      Math.max(1, this.paginador.number - 4),
      this.paginador.totalPages - 5
    );
    // Se calcula con el máximo entre dos valores
    this.hasta = Math.max(
      Math.min(this.paginador.totalPages, this.paginador.number + 4),
      6
    );

    if (this.paginador.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1)
        .fill(0)
        .map((valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages)
        .fill(0)
        .map((valor, indice) => indice + 1);
    }
  }
}
