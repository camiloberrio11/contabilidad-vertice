import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { crearListaAnos, crearListaMeses } from 'src/app/core/helpers/fechas';
import { BackendService } from 'src/app/core/services/backend.service';
import { Archivo, RegistroArchivoItem } from 'src/app/models/Archivo';
import { Obra } from 'src/app/models/Obra';
import { construirArbol } from '../../helpers/archivo';
import { Router } from '@angular/router';
const TODOS_MESES = 13131313;

@Component({
  selector: 'app-historial-archivo',
  templateUrl: './historial-archivo.component.html',
  styleUrls: ['./historial-archivo.component.css'],
})
export class HistorialArchivoComponent implements OnInit {
  formularioObtener: UntypedFormGroup;
  loading = false;
  listadoObras: Obra[] = [];
  files1: any[] = [];
  listadoAnos = crearListaAnos();
  listadoMeses = crearListaMeses();
  listadoArchivos: Archivo[] = [];
  constructor(private backendService: BackendService,
    private modalService: NgbModal,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.formBuild();
    this.obtenerObras();
  }

  async buscar(): Promise<void> {
    try {
      this.loading = true;
      const values = this.formularioObtener?.value;
      this.listadoArchivos = (
        await this.backendService?.obtenerArchivo({
          ano: values?.ano === 'TODOS' ? '' : values?.ano || '',
          mes: values?.mes || '',
          obra: values?.obra || '',
          nombre: values?.nombre || '',
        })
      )?.data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }

    async handleVerArchivo(info: Archivo): Promise<void> {
      this.router.navigate(['/admin/verarchivo'], {state: {info: info?.Informacion, id: info?._id}});
  }

  private async obtenerObras(): Promise<void> {
    try {
      this.loading = true;
      const servicioObras = await this.backendService.listarObras();
      this.listadoObras = servicioObras?.data || [];
      this.loading = false;
      this.formatearOpciones();
    } catch (error) {
      this.listadoObras = [];
      console.log(error);
      this.loading = false;
    }
  }

  private formatearOpciones(): void {
    this.listadoAnos?.unshift('TODOS');
    this.listadoMeses?.unshift({ id: TODOS_MESES, mes: 'TODOS' });
    this.listadoObras?.unshift({ _id: '', Nombre: 'TODAS' });
    this.formBuild();
  }

  private formBuild(): void {
    this.formularioObtener = new UntypedFormGroup({
      nombre: new UntypedFormControl('', [Validators.required]),
      mes: new UntypedFormControl(this.listadoMeses[0]?.id, [
        Validators.required,
      ]),
      ano: new UntypedFormControl(this.listadoAnos[0], [Validators.required]),
      obra: new UntypedFormControl(this.listadoObras[0]?._id, [
        Validators.required,
      ]),
    });
  }


}
