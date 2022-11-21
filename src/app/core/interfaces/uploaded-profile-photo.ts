import { Cliente } from '@core/models';

export interface UploadedProfilePhotoDTO {
  cliente: Cliente;
  mensaje: string;
}
