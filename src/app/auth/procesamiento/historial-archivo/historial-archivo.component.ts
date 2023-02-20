import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { crearListaAnos, crearListaMeses } from 'src/app/core/helpers/fechas';
import { BackendService } from 'src/app/core/services/backend.service';
import { Obra } from 'src/app/models/Obra';

@Component({
  selector: 'app-historial-archivo',
  templateUrl: './historial-archivo.component.html',
  styleUrls: ['./historial-archivo.component.css'],
})
export class HistorialArchivoComponent implements OnInit {
  formularioObtener: UntypedFormGroup;
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

  async buscar(): Promise<void> {
    try {
      this.loading = true;
      const values = this.formularioObtener?.value;
      await this.backendService?.obtenerArchivo({
        ano: values?.ano || '',
        mes: values?.mes || '',
        obra: values?.obra || '',
        nombre: values?.nombre || '',
      });
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }

  private async obtenerObras(): Promise<void> {
    try {
      this.loading = true;
      const servicioObras = await this.backendService.listarObras();
      this.listadoObras = servicioObras.data;
      this.loading = false;
      this.formatearOpciones();
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  private formatearOpciones(): void {
    this.listadoAnos?.unshift('');
    this.listadoMeses?.unshift({ id: 13131313, mes: '' });
    this.listadoObras?.unshift({ _id: '', Nombre: '' });
    this.formBuild();
  }

  private formBuild(): void {
    this.formularioObtener = new UntypedFormGroup({
      nombre: new UntypedFormControl('', [Validators.required]),
      mes: new UntypedFormControl(this.listadoMeses[0]?.id, [Validators.required]),
      ano: new UntypedFormControl(this.listadoAnos[0], [Validators.required]),
      obra: new UntypedFormControl(this.listadoObras[0]?._id, [Validators.required]),
    });
  }
}
