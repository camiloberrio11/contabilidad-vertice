import { Component, OnInit } from '@angular/core';
import { crearListaAnos, crearListaMeses } from 'src/app/core/helpers/fechas';
import { BackendService } from 'src/app/core/services/backend.service';
import { Obra } from 'src/app/models/Obra';

@Component({
  selector: 'app-historial-archivo',
  templateUrl: './historial-archivo.component.html',
  styleUrls: ['./historial-archivo.component.css'],
})
export class HistorialArchivoComponent implements OnInit {
  listaSimulada = [
    {
      codigo: 'AAA123',
      consolidado: '854,765,12',
      nombre: 'COSTOS PATRIMONIOS AUTONOMOS',
    },
    {
      codigo: 'AAA123',
      consolidado: '854,765,12',
      nombre: 'COSTOS PATRIMONIOS AUTONOMOS',
    },
    {
      codigo: 'AAA123',
      consolidado: '854,765,12',
      nombre: 'COSTOS PATRIMONIOS AUTONOMOS',
    },
    {
      codigo: 'AAA123',
      consolidado: '854,765,12',
      nombre: 'COSTOS PATRIMONIOS AUTONOMOS',
    },
    {
      codigo: 'AAA123',
      consolidado: '854,765,12',
      nombre: 'COSTOS PATRIMONIOS AUTONOMOS',
    },
    {
      codigo: 'AAA123',
      consolidado: '854,765,12',
      nombre: 'COSTOS PATRIMONIOS AUTONOMOS',
    },
  ];
  loading = false;
  listadoObras: Obra[] = [];
  listadoAnos = crearListaAnos();
  listadoMeses = crearListaMeses();
  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.obtenerObras();
  }

  private async obtenerObras(): Promise<void> {
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
