import { Component } from '@angular/core';
import { BackendService } from 'src/app/core/services/backend.service';
import { TipoArchivo } from 'src/app/models/TipoArchivo';

@Component({
  selector: 'app-tipoarchivo',
  templateUrl: './tipoarchivo.component.html',
  styleUrls: ['./tipoarchivo.component.css'],
})
export class TipoarchivoComponent {
  loading = false;
  nombre = '';
  listaTipoArchivos: TipoArchivo[] = [];

  constructor(private readonly backendService: BackendService) {
    this.getListaTipoArchivos();
  }

  async handleGuardar(): Promise<void> {
    try {
      if (!this.nombre) {
        alert('Debes tener un nombre');
        return;
      }
      this.loading = true;
      await this.backendService.crearTipoArchivo({ nombre: this.nombre });
      this.loading = false;
      alert('Tipo archivo creado');
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
    this.loading = true;
  }

  private async getListaTipoArchivos(): Promise<void> {
    try {
      this.loading = true;
      this.listaTipoArchivos = (
        await this.backendService.obtenerListadoTipoArchivo()
      )?.data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }
}
