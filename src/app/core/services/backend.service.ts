import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrearObra, Obra, RespuestaObra } from 'src/app/models/Obra';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CrearEtiqueta,
  Etiqueta,
  RespuestaEtiqueta,
} from 'src/app/models/Etiqueta';
import {
  CrearArchivo,
  EliminarRegistroArchivo,
  QueryArchivo,
  RespuestaArchivo,
  RespuestaCrearArchivo,
} from 'src/app/models/Archivo';
import {
  AsignarEtiqueta,
  RespuestaAsignarEtiqueta,
} from 'src/app/models/AsignacionEtiqueta';
import { BodyCrearArchivo } from 'src/app/models/Excel';
import { RespuestaEtiquetados } from 'src/app/models/Etiquetados';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  crearObra(body: CrearObra): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${environment?.urlBackend}/api/obra`, body)
    );
  }

  listarObras(): Promise<RespuestaObra> {
    return firstValueFrom(
      this.http.get<RespuestaObra>(`${environment?.urlBackend}/api/obras`)
    );
  }

  actualizarObra(id: string = '', body: Obra): Promise<RespuestaObra> {
    return firstValueFrom(
      this.http.put<RespuestaObra>(
        `${environment?.urlBackend}/api/obra/${id}`,
        body
      )
    );
  }

  crearEtiqueta(body: CrearEtiqueta): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${environment?.urlBackend}/api/etiqueta`, body)
    );
  }

  listarEtiquetas(): Promise<RespuestaEtiqueta> {
    return firstValueFrom(
      this.http.get<RespuestaEtiqueta>(
        `${environment?.urlBackend}/api/etiquetas`
      )
    );
  }

  actualizarEtiqueta(id: string = '', body: Etiqueta): Promise<RespuestaObra> {
    return firstValueFrom(
      this.http.put<RespuestaObra>(
        `${environment?.urlBackend}/api/etiqueta/${id}`,
        body
      )
    );
  }

  crearArchivo(body: CrearArchivo): Promise<RespuestaCrearArchivo> {
    return firstValueFrom(
      this.http.post<RespuestaCrearArchivo>(
        `${environment?.urlBackend}/api/archivo`,
        body
      )
    );
  }

  obtenerArchivo(query: QueryArchivo): Promise<RespuestaArchivo> {
    return firstValueFrom(
      this.http.post<RespuestaArchivo>(
        `${environment?.urlBackend}/api/obtenerarchivo`,
        query
      )
    );
  }

  asignarEtiqueta(body: AsignarEtiqueta): Promise<RespuestaAsignarEtiqueta> {
    return firstValueFrom(
      this.http.post<RespuestaAsignarEtiqueta>(
        `${environment?.urlBackend}/api/asignaretiqueta`,
        body
      )
    );
  }

  eliminarItemEnArchivo(
    info: EliminarRegistroArchivo
  ): Promise<RespuestaAsignarEtiqueta> {
    return firstValueFrom(
      this.http.post<RespuestaAsignarEtiqueta>(
        `${environment?.urlBackend}/api/eliminarregistro`,
        { ...info }
      )
    );
  }

  crearArchivoExcel(info: BodyCrearArchivo): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'blob', // Se indica que se espera recibir un archivo
    };
    return firstValueFrom(
      this.http.post<any>(`${environment?.urlBackend}/api/excel`, {
        ...info,
      })
    );
  }

  obtenerInformacionEtiquetados(id: string): Promise<RespuestaEtiquetados> {
    return firstValueFrom(
      this.http.get<any>(`${environment?.urlBackend}/api/etiquetados/${id}`)
    );
  }
}
