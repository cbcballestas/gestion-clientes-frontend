export interface ResponseUtil<T> {
  estado: string;
  data: T;
  mensaje: string;
}

export interface PaginatedResponse<T> {
  medidaPagina: number;
  numeroPagina: number;
  totalPaginas: number;
  totalElementos: number;
  lista: T[];
  esUltima: boolean;
}

export interface MainPaginatedResponse<T> {
  estado: string;
  mensaje: string;
  data: PaginatedResponse<T>;
}
