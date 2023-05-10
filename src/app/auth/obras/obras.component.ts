import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  constructor(
    private readonly backendService: BackendService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.obtenerObras();
  }

  cambioValor(event: string): void {
    this.nombreObra = event?.toUpperCase();
  }

  async handleGuardar(): Promise<void> {
    try {
      if (!this.nombreObra) {
        this.toastr.error('La obra debe tener un nombre');
        return;
      }
      this.loading = true;
      await this.backendService.crearObra({ nombre: this.nombreObra });
      this.nombreObra = '';
      this.loading = false;
      this.toastr.success('Obra creada');
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
