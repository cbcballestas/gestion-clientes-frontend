export interface HttpErrorResponse {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error;
}

export interface Error {
  fecha: string;
  mensaje: string;
  urlRecurso: string;
  errores?: string[];
}

export interface Headers {
  normalizedNames: NormalizedNames;
  lazyUpdate: null;
}

export interface NormalizedNames {}
