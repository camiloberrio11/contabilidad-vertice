import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/core/services/backend.service';
import { Obra } from 'src/app/models/Obra';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css'],
})
export class ObrasComponent implements OnInit {
  loading = false;
  listadoObras: Obra[] = [];
  nombreObra = '';
  constructor(private readonly backendService: BackendService) {}

  ngOnInit(): void {
    this.obtenerObras();
  }

  cambioValor(event: string): void {
    this.nombreObra = event?.toUpperCase();
  }

  async handleGuardar(): Promise<void> {
    try {
      if (!this.nombreObra) {
        alert('Debe tener un nombre');
        return;
      }
      this.loading = true;
      await this.backendService.crearObra({ nombre: this.nombreObra });
      this.nombreObra = '';
      this.loading = false;
      alert('Obra creada');
      this.obtenerObras();
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  async obtenerObras(): Promise<void> {
    try {
      this.loading = true;
      const servicioObras = await this.backendService.listarObras();
      this.listadoObras = servicioObras.data;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }
}
