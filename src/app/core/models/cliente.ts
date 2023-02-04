import { Region } from './region';

export class Cliente {
  constructor(
    public id: number,
    public nombre: string,
    public apellido: string,
    public email: string,
    public fechaNacimiento: string,
    public region: Region | null,
    public foto?: string
  ) {}
}
