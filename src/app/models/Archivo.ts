import { Obra } from './Obra';

export interface CrearArchivo {
  nombre: string;
  mes: string;
  ano: string;
  obra: string;
  srcArchivo: string | ArrayBuffer | null;
  esPlantilla: boolean;
  tipoArchivo: string;
}

export interface RespuestaArchivo {
  ok: boolean;
  message: string;
  data: Archivo[];
}

export interface RespuestaCrearArchivo {
  ok: boolean;
  message: string;
  data: RegistroArchivoItem[];
}

export interface RegistroArchivoItem {
  data: {
    nombre: string;
    codigo: string;
    consolidado: string;
    etiqueta?: any;
    papaId?: string;
  };
}

export interface Archivo {
  _id?: string;
  Nombre: string;
  Mes: string;
  Ano: string;
  Obra: Obra;
  Informacion: {
    data: {
      nombre: string;
      codigo: string;
      consolidado: string;
      etiqueta: {
        _id: string;
        Nombre: string;
        Estado: boolean;
        Color: string;
      };
      children?: any[];
    };
  }[];
  FechaCreacion: string;
  FechaActualizacion: string;
  __v?: number;
}

export interface QueryArchivo {
  ano: string;
  mes: string;
  obra: string;
  nombre: string;
}

export interface EliminarRegistroArchivo {
  id: string;
  idRegistro: string;
}
