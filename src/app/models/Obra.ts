export interface CrearObra {
  nombre: string;
}

export interface RespuestaObra {
  ok: boolean;
  message: string;
  data: Obra[];
}

export interface Obra {
  _id?: string;
  Estado?: boolean;
  Nombre: string;
  FechaCreacion?: string;
  __v?: number;
}
