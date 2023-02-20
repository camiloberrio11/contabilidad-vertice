export interface CrearArchivo {
  nombre: string;
  mes: string;
  ano: string;
  obra: string;
  srcArchivo: string | ArrayBuffer | null;
}

export interface RespuestaArchivo {
  ok: boolean;
  message: string;
  data: { [key: string]: string }[];
}

export interface Archivo {
  _id?: string;
  Nombre: string;
  Mes: string;
  Ano: string;
  Obra: string;
  Informacion: { [key: string]: string }[];
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
