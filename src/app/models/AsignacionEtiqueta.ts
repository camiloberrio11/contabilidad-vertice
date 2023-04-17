import { RegistroArchivoItem } from './Archivo';
import { Etiqueta } from './Etiqueta';

export interface AsignarEtiqueta {
  codigo: string;
  idArchivo: string;
  etiqueta: {
    _id: string;
    Nombre: string;
    Estado: boolean;
    Color: string;
  };
}

export interface RespuestaAsignarEtiqueta {
  ok: boolean;
  message: string;
  data: RegistroArchivoItem[]
}
