import { Obra } from 'src/app/models/Obra';
import { BackendService } from './../../../core/services/backend.service';
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { crearListaAnos, crearListaMeses } from 'src/app/core/helpers/fechas';
import { Archivo } from 'src/app/models/Archivo';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Etiqueta } from 'src/app/models/Etiqueta';

@Component({
  selector: 'app-cargar-archivo',
  templateUrl: './cargar-archivo.component.html',
  styleUrls: ['./cargar-archivo.component.css'],
})
export class CargarArchivoComponent implements OnInit {
  loading = false;
  @ViewChild('inputFile')
  myInputVariable: ElementRef;
  formularioArchivo: UntypedFormGroup;
  listadoObras: Obra[] = [];
  listadoEtiquetas: Etiqueta[] = [];
  listadoAnos = crearListaAnos();
  listadoMeses = crearListaMeses();
  archivoSubido: { [key: string]: string }[];
  srcArchivo: string | ArrayBuffer | null = '';
  files1: any[] = [
    {
      data: {
        nombre: 'COSTOS PATRIMONIOS AUTONOMOS',
        codigo: '198025',
        consolidado: '853,470,881.11 ',
      },
      children: [
        {
          data: {
            nombre: 'MATERIAS PRIMAS CONSTRUCCION',
            codigo: '19802501',
            consolidado: '2,350,592,569.23 ',
            color: 'green',
          },
          children: [
            {
              data: {
                nombre: 'MATERIALES DE CONSTRUCCION',
                codigo: '1980250101',
                consolidado: '10,286,589,193.00 ',
                color: 'red',
              },
            },
            {
              data: {
                nombre: 'MARIALES EN TRANSITO',
                codigo: '1980250102',
                consolidado: '0.00',
              },
            },
            {
              data: {
                nombre: 'MATERIA PRIMA NO DEDUCIBLE',
                codigo: '1980250103',
                consolidado: '0.00',
              },
            },
          ],
        },
        {
          data: {
            nombre: 'SOBRANTES Y/O FALTANTES DE INVENTARIO',
            codigo: '19802502',
            consolidado: '1.00 ',
          },
          children: [
            {
              data: {
                nombre: 'MATERIALES',
                codigo: '1980250201',
                consolidado: '0.00',
              },
            },
          ],
        },
      ],
    },
  ];
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
  constructor(
    private backendService: BackendService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.obtenerObras();
  }

  eliminarItem(item: any): void {
    console.log(item);
    const nuevoListado = [];
    for (const iterator of this.files1) {
    }
    // this.files1 = this.files1.filter(it => it.)
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.srcArchivo = reader.result;
    };
  }

  async crearArchivo(): Promise<void> {
    try {
      this.loading = true;
      const srcArchivo = this.srcArchivo?.toString()?.split('base64,') || '';
      const values = this.formularioArchivo?.value;
      const respuesta = (
        await this.backendService.crearArchivo({
          nombre: values?.nombre,
          mes: values?.mes,
          ano: values?.ano,
          obra: values?.obra,
          srcArchivo: srcArchivo[1],
        })
      )?.data;
      this.archivoSubido = respuesta[0]?.Informacion;
      this.loading = false;
      this.reinicioInput();
      alert('Archivo creado');
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }

  reinicioInput() {
    this.myInputVariable.nativeElement.value = '';
  }

  async openModalTags(
    component: TemplateRef<any>,
    item: {
      nombre: string;
      codigo: string;
      consolidado: string;
    }
  ): Promise<void> {
    try {
      this.loading = true;
      this.listadoEtiquetas = (
        await this.backendService.listarEtiquetas()
      )?.data;
      this.loading = false;
      const result = await this.modalService.open(component, {
        ariaLabelledBy: 'modal-basic-title',
      }).result;
      this.loading = false;
      if (result) {
        this.actualizarArchivo();
      }
    } catch (error) {
      this.loading = false;
      console.log('Error en modal', error);
    }
  }

  private async obtenerObras(): Promise<void> {
    try {
      this.loading = true;
      const servicioObras = await this.backendService.listarObras();
      this.listadoObras = servicioObras.data;
      this.formBuild();
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  private formBuild(): void {
    this.formularioArchivo = new UntypedFormGroup({
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

  private actualizarArchivo(): void {
    this.loading = true;
    setTimeout(() => {
      this.files1 = this.files1;
      this.loading = false;
    }, 2000);
  }
}
