import { Obra } from 'src/app/models/Obra';
import { BackendService } from './../../../core/services/backend.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { crearListaAnos, crearListaMeses } from 'src/app/core/helpers/fechas';
import { Archivo } from 'src/app/models/Archivo';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';

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
  listadoAnos = crearListaAnos();
  listadoMeses = crearListaMeses();
  archivoSubido: { [key: string]: string }[];
  srcArchivo: string | ArrayBuffer | null = '';
  files1: TreeNode[] = [
    {
      data: {
        name: 'Applications',
        size: '200mb',
        type: 'Folder',
      },
      children: [
        {
          data: {
            name: 'Angular',
            size: '25mb',
            type: 'Folder',
          },
          children: [
            {
              data: {
                name: 'angular.app',
                size: '10mb',
                type: 'Application',
              },
            },
            {
              data: {
                name: 'cli.app',
                size: '10mb',
                type: 'Application',
              },
            },
            {
              data: {
                name: 'mobile.app',
                size: '5mb',
                type: 'Application',
              },
            },
          ],
        },
        {
          data: {
            name: 'editor.app',
            size: '25mb',
            type: 'Application',
          },
        },
        {
          data: {
            name: 'settings.app',
            size: '50mb',
            type: 'Application',
          },
        },
      ],
    },
    {
      data: {
        name: 'Cloud',
        size: '20mb',
        type: 'Folder',
      },
      children: [
        {
          data: {
            name: 'backup-1.zip',
            size: '10mb',
            type: 'Zip',
          },
        },
        {
          data: {
            name: 'backup-2.zip',
            size: '10mb',
            type: 'Zip',
          },
        },
      ],
    },
    {
      data: {
        name: 'Desktop',
        size: '150kb',
        type: 'Folder',
      },
      children: [
        {
          data: {
            name: 'note-meeting.txt',
            size: '50kb',
            type: 'Text',
          },
        },
        {
          data: {
            name: 'note-todo.txt',
            size: '100kb',
            type: 'Text',
          },
        },
      ],
    },
    {
      data: {
        name: 'Documents',
        size: '75kb',
        type: 'Folder',
      },
      children: [
        {
          data: {
            name: 'Work',
            size: '55kb',
            type: 'Folder',
          },
          children: [
            {
              data: {
                name: 'Expenses.doc',
                size: '30kb',
                type: 'Document',
              },
            },
            {
              data: {
                name: 'Resume.doc',
                size: '25kb',
                type: 'Resume',
              },
            },
          ],
        },
        {
          data: {
            name: 'Home',
            size: '20kb',
            type: 'Folder',
          },
          children: [
            {
              data: {
                name: 'Invoices',
                size: '20kb',
                type: 'Text',
              },
            },
          ],
        },
      ],
    },
    {
      data: {
        name: 'Downloads',
        size: '25mb',
        type: 'Folder',
      },
      children: [
        {
          data: {
            name: 'Spanish',
            size: '10mb',
            type: 'Folder',
          },
          children: [
            {
              data: {
                name: 'tutorial-a1.txt',
                size: '5mb',
                type: 'Text',
              },
            },
            {
              data: {
                name: 'tutorial-a2.txt',
                size: '5mb',
                type: 'Text',
              },
            },
          ],
        },
        {
          data: {
            name: 'Travel',
            size: '15mb',
            type: 'Text',
          },
          children: [
            {
              data: {
                name: 'Hotel.pdf',
                size: '10mb',
                type: 'PDF',
              },
            },
            {
              data: {
                name: 'Flight.pdf',
                size: '5mb',
                type: 'PDF',
              },
            },
          ],
        },
      ],
    },
    {
      data: {
        name: 'Main',
        size: '50mb',
        type: 'Folder',
      },
      children: [
        {
          data: {
            name: 'bin',
            size: '50kb',
            type: 'Link',
          },
        },
        {
          data: {
            name: 'etc',
            size: '100kb',
            type: 'Link',
          },
        },
        {
          data: {
            name: 'var',
            size: '100kb',
            type: 'Link',
          },
        },
      ],
    },
    {
      data: {
        name: 'Other',
        size: '5mb',
        type: 'Folder',
      },
      children: [
        {
          data: {
            name: 'todo.txt',
            size: '3mb',
            type: 'Text',
          },
        },
        {
          data: {
            name: 'logo.png',
            size: '2mb',
            type: 'Picture',
          },
        },
      ],
    },
    {
      data: {
        name: 'Pictures',
        size: '150kb',
        type: 'Folder',
      },
      children: [
        {
          data: {
            name: 'barcelona.jpg',
            size: '90kb',
            type: 'Picture',
          },
        },
        {
          data: {
            name: 'primeng.png',
            size: '30kb',
            type: 'Picture',
          },
        },
        {
          data: {
            name: 'prime.jpg',
            size: '30kb',
            type: 'Picture',
          },
        },
      ],
    },
    {
      data: {
        name: 'Videos',
        size: '1500mb',
        type: 'Folder',
      },
      children: [
        {
          data: {
            name: 'primefaces.mkv',
            size: '1000mb',
            type: 'Video',
          },
        },
        {
          data: {
            name: 'intro.avi',
            size: '500mb',
            type: 'Video',
          },
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
      this.archivoSubido = respuesta?.splice(1);
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

  abrirModal(component: any, action: 'etiqueta' | 'eliminar') {
    if (action === 'etiqueta') {
    }
    // this.obraSelected = obra;
    // this.formBuild();
    // this.modalService
    //   .open(component, { ariaLabelledBy: 'modal-basic-title' })
    //   .result.then(
    //     (result) => {
    //       // Save click
    //       this.handleActualizarObra();

    //     },
    //     (reason) => {
    //       console.log(reason);
    //     }
    //   );
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
      mes: new UntypedFormControl(this.listadoMeses[0]?.id, [Validators.required]),
      ano: new UntypedFormControl(this.listadoAnos[0], [Validators.required]),
      obra: new UntypedFormControl(this.listadoObras[0]?._id, [Validators.required]),
    });
  }
}
