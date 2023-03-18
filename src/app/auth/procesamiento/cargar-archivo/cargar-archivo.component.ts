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
import {
  Archivo,
  RegistroArchivoItem,
  RespuestaCrearArchivo,
} from 'src/app/models/Archivo';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Etiqueta } from 'src/app/models/Etiqueta';
import Swal from 'sweetalert2';
import { construirArbol } from '../../helpers/archivo';
import { TipoArchivo } from 'src/app/models/TipoArchivo';

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
  listadoTipoArchivo: TipoArchivo[] = [];

  listadoEtiquetas: Etiqueta[] = [];
  listadoAnos = crearListaAnos();
  listadoMeses = crearListaMeses();
  srcArchivo: string | ArrayBuffer | null = '';
  files1: any[] = [];

  constructor(
    private backendService: BackendService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.obtenerObras();
    this.formBuild();
  }

  confirmarEliminar(item: any): void {
    Swal.fire({
      title: 'Deseas eliminar este registro y sus hijos',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.eliminarItem(item);
      }
    });
  }

  subirArchivo(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.srcArchivo = reader.result;
    };
  }

  revisarEstado(event: any) {
    const checked = event?.srcElement?.checked;
    if (checked) {
      Swal.fire(
        'Un momento',
        'Recuerda que si seleccionas esto, se reemplazará por la que esté activa actualmente (Plantilla unica por obra por tipo de archivo)',
        'info'
      );
    }
  }

  handle(event: any) {
    const text =
      event?.target?.value
        ?.toUpperCase()
        ?.trim()
        ?.replace(/\s+/g, '')
        ?.replace(/[^a-zA-Z\s]/g, '') || '';
    this.formularioArchivo.patchValue({ nombre: text });
  }

  async crearArchivo(): Promise<void> {
    try {
      this.loading = true;
      const srcArchivo = this.srcArchivo?.toString()?.split('base64,') || '';
      const values = this.formularioArchivo?.value;
      const respuesta = await this.backendService.crearArchivo({
        nombre: values?.nombre,
        mes: values?.mes,
        ano: values?.ano,
        obra: values?.obra,
        srcArchivo: srcArchivo[1],
        esPlantilla: values?.esPlantilla,
        tipoArchivoId: values?.tipoArchivo,
      });
      this.mappearArchivo(respuesta.data);
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
      this.obtenerListadoTipoArchivo();

      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  private async obtenerListadoTipoArchivo(): Promise<void> {
    try {
      this.loading = true;
      this.listadoTipoArchivo = (
        await this.backendService.obtenerListadoTipoArchivo()
      )?.data;
      this.loading = false;
      this.formBuild();
    } catch (error) {
      this.loading = false;
      console.log(error);
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
      tipoArchivo: new UntypedFormControl(this.listadoTipoArchivo[0]?.tipo, [
        Validators.required,
      ]),
      esPlantilla: new UntypedFormControl(false, [Validators.required]),
    });
  }

  private async actualizarArchivo(): Promise<void> {
    try {
      this.loading = true;
      await this.backendService.asignarEtiqueta({
        codigo: '1105',
        idArchivo: '63fd15f262542c46b3a8af1c',
        etiqueta: {
          _id: '63e67f9314aca1d46902e8f8',
          Nombre: 'TERRENO',
          Estado: true,
          Color: '#f00f0f',
        },
      });
      this.loading = false;
      alert('Etiqueta Actualizada');
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }

  private mappearArchivo(listadoArchivo: RegistroArchivoItem[]): void {
    this.loading = true;
    this.files1 = construirArbol(listadoArchivo);
    this.loading = false;
  }

  private async eliminarItem(item: any): Promise<void> {
    try {
      this.loading = true;
      const archivo = (
        await this.backendService.eliminarItemEnArchivo({
          id: '',
          idRegistro: '',
        })
      )?.data;
      this.mappearArchivo(archivo?.Informacion);
      this.loading = false;
      alert('Item eliminado');
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }
}
