import { RegistroArchivoItem } from './Archivo';

export interface RespuestaEtiquetados {
  ok: boolean;
  message: string;
  data: RegistroArchivoItem[]
}
