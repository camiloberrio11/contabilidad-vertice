export interface CrearEtiqueta {
  nombre: string;
  color: string;
}

export interface RespuestaEtiqueta {
  ok: boolean;
  message: string;
  data: Etiqueta[];
}

export interface Etiqueta {
  _id: string;
  Estado: boolean;
  FechaCreacion: string;
  Color: string;
  __v: number;
}
