import { Obra } from 'src/app/models/Obra';
import { BackendService } from './../../../core/services/backend.service';
import { Component, OnInit } from '@angular/core';
import { crearListaAnos, crearListaMeses } from 'src/app/core/helpers/fechas';

@Component({
  selector: 'app-cargar-archivo',
  templateUrl: './cargar-archivo.component.html',
  styleUrls: ['./cargar-archivo.component.css'],
})
export class CargarArchivoComponent implements OnInit {
  loading = false;
  listadoObras: Obra[] = [];
  listadoAnos = crearListaAnos();
  listadoMeses = crearListaMeses();
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
  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.obtenerObras();
  }

  uploadFile(event: any) {
    // const element = event.currentTarget as HTMLInputElement;
    // let fileList: FileList | null = element.files;
    // if (fileList) {
    //   console.log("FileUpload -> files", fileList);
    // }
    // const element = event.currentTarget as HTMLInputElement;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
    };
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
