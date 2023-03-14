export interface CrearTipoArchivo {
  nombre: string;
}

export interface RespuestaTipoArchivo {
  ok: boolean;
  message: string;
  data: TipoArchivo[];
}

export interface TipoArchivo {
  _id?: string;
  Nombre: string;
  FechaCreacion?: string;
  __v?: number;
}
