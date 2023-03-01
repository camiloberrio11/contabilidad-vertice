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
  data: {
    _id: string;
    Nombre: string;
    Mes: string;
    Ano: string;
    Obra: string;
    Informacion: {
      data: {
        nombre: string;
        codigo: string;
        consolidado: string;
        etiqueta: Etiqueta;
        children: any[];
      };
    }[];
  };
}
