

export interface RespuestaTipoArchivo {
  ok: boolean;
  message: string;
  data: TipoArchivo[];
}

export interface TipoArchivo {
  id: number;
  tipo: string;
}
