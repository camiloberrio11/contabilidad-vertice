import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DndDropEvent } from 'ngx-drag-drop';
import { DropEvent } from 'ng-drag-drop';
import { BackendService } from 'src/app/core/services/backend.service';
import { Archivo } from 'src/app/models/Archivo';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import Swal from 'sweetalert2';
import { construirArbol } from '../../helpers/archivo';

@Component({
  selector: 'app-armar-formulas',
  templateUrl: './armar-formulas.component.html',
  styleUrls: ['./armar-formulas.component.css'],
})
export class ArmarFormulasComponent implements OnInit {
  loading = false;
  formularioCrearEtiqueta: UntypedFormGroup;
  listadoVentas: Archivo[] = [];
  listadoCostos: Archivo[] = [];


  itemsVentas: TreeviewItem[] = [];
  itemsCostos: TreeviewItem[] = [];


  items: TreeviewItem[] = [
    new TreeviewItem({
      text: 'Parent 1',
      value: 1,
      children: [
        {
          text: 'Child 1.1',
          value: 11,
        },
        {
          text: 'Child 1.2',
          value: 12,
        },
      ],
      checked: false,
    }),
    new TreeviewItem({
      text: 'Parent 2',
      value: 2,
      children: [
        {
          text: 'Child 2.1',
          value: 21,
        },
        {
          text: 'Child 2.2',
          value: 22,
        },
      ],
      checked: false,
    }),
  ];

  config: TreeviewConfig = {
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: false,
    maxHeight: 400,
    decoupleChildFromParent: false,
    hasDivider: true,
  };

  selectedItems = '0';
  selectedItemsMath: number;

  archivoExcel: any[] = [];

  constructor(private readonly backendService: BackendService) {
    this.formBuild();
    this.itemsArbolEstado();
  }

  ngOnInit(): void {
    this.obtenerArchivos();
  }

  onSelectedChangeVentas(event: number[]) {
    console.log(event);
    if (event.length > 0) {
      this.selectedItems = `${this.selectedItems}+${event?.pop()}`;
      this.selectedItemsMath = eval(this.selectedItems);
    } else {
      this.selectedItems = `0`;
      this.selectedItemsMath = eval(this.selectedItems);
    }
  }

  onSelectedChangeCostos(event: number[]) {
    console.log(event);
    if (event.length > 0) {
      this.changeTextArea(`${this.selectedItems}+${event?.pop()}`);
    } else {
      this.changeTextArea(`0`);
    }
  }

  private changeTextArea(value: string) {
    this.selectedItems = value;
    this.selectedItemsMath = eval(this.selectedItems);
  }

  private async obtenerArchivos() {
    try {
      this.loading = true;
      const result = await this.backendService.obtenerArchivo({});
      this.listadoVentas = result?.data?.filter(
        (it) => it?.TipoArchivo === 'VENTAS'
      );
      this.listadoCostos = result?.data?.filter(
        (it) => it?.TipoArchivo === 'COSTOS'
      );
      this.loading = false;
      this.formBuild();
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  buscar() {
    const archivoVentas: any = this.listadoVentas.find(
      (it) =>
        it?._id === this.formularioCrearEtiqueta.value.itemSeleccionadoVentas
    );
    const archivoCostos: any = this.listadoCostos.find(
      (it) =>
        it?._id === this.formularioCrearEtiqueta.value.itemSeleccionadoCostos
    );



    const result = construirArbol(archivoCostos?.Informacion);
    console.log(result);


    // this.itemsCostos
    // {
    //   text: 'Parent 2',
    //   value: 2,
    //   children: [
    //     {
    //       text: 'Child 2.1',
    //       value: 21,
    //     },
    //     {
    //       text: 'Child 2.2',
    //       value: 22,
    //     },
    //   ],
    //   checked: false,
    // }

  }

  // private mappearArchivo(listadoArchivo: RegistroArchivoItem[]): void {
  //   this.loading = true;
  //   this.files1 = construirArbol(listadoArchivo);
  //   this.loading = false;
  // }

  itemsArbolEstado(): void {
    this.items.forEach((item) => {
      item.checked = false;
      if (item.children) {
        item.children.forEach((child) => (child.checked = false));
      }
    });
  }

  guardarItem(): void {
    this.archivoExcel.push({
      id: this.archivoExcel.length,
      value: this.selectedItemsMath,
    });
    this.changeTextArea(`0`);
    this.itemsArbolEstado();
    alert('Item guardado');
  }

  alertFinalizarArchivo(): void {
    Swal.fire({
      title: 'Deseas finalizar el archivo, asignale un nombre a este archivo',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Si, finalizar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const nombreArchivo =
          result.value || `archivo-${new Date()?.toISOString()?.split('T')[0]}`;
        console.log(nombreArchivo);
        this.finalizar(nombreArchivo);
      }
    });
  }

  private async finalizar(nombreArchivo: string): Promise<void> {
    console.log('Llama a generar archivo');
  }

  private formBuild(): void {
    this.formularioCrearEtiqueta = new UntypedFormGroup({
      itemSeleccionadoVentas: new UntypedFormControl(
        this.listadoVentas[0]?._id,
        [Validators.required]
      ),
      itemSeleccionadoCostos: new UntypedFormControl(
        this.listadoCostos[0]?._id,
        [Validators.required]
      ),
    });
  }
}
