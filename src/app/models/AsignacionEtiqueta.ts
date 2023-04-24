import { RegistroArchivoItem } from './Archivo';

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
