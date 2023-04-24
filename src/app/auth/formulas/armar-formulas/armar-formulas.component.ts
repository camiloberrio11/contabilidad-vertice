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

@Component({
  selector: 'app-armar-formulas',
  templateUrl: './armar-formulas.component.html',
  styleUrls: ['./armar-formulas.component.css'],
})
export class ArmarFormulasComponent implements OnInit {
  loading = false;
  formularioCrearEtiqueta: UntypedFormGroup;
  listadoVentas: Archivo[] = [
    // { Nombre: 'ARCHIVO 1 VENTAS', _id: 1 },
    // { Nombre: 'ARCHIVO 2 VENTAS', _id: 2 },
    // { Nombre: 'ARCHIVO 3 VENTAS', _id: 3 },
    // { Nombre: 'ARCHIVO 4 VENTAS', _id: 4 },
  ];
  listadoCostos: Archivo[] = [
    //   { Nombre: 'ARCHIVO 1 COSTOS', _id: 1 },
    //   { Nombre: 'ARCHIVO 2 COSTOS', _id: 2 },
    //   { Nombre: 'ARCHIVO 3 COSTOS', _id: 3 },
    //   { Nombre: 'ARCHIVO 4 COSTOS', _id: 4 },
    //   { Nombre: 'ARCHIVO 5 COSTOS', _id: 5 },
    //   { Nombre: 'ARCHIVO 6 COSTOS', _id: 6 },
  ];

  list1: any = [
    // {codigo: '1', consolidado: '11'},
    // {codigo: '2', consolidado: '22'},
    // {codigo: '3', consolidado: '33'},
    // {codigo: '5', consolidado: '55'},
  ];

  list2: any[] = [];
  textareaTemp = '';

  constructor(private readonly backendService: BackendService) {
    this.formBuild();
  }

  ngOnInit(): void {
    this.obtenerArchivos();
  }

  onDrop(e: DropEvent) {
    console.log(e);
    this.textareaTemp = `${this.textareaTemp}${+e.dragData.consolidado}`;
    this.list2.push(e.dragData);
    // this.removeItem(e.dragData, this.list1);
  }

  fin() {
    console.log(+this.textareaTemp);
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
    const archivoVentas = this.listadoVentas.find(
      (it) =>
        it?._id === this.formularioCrearEtiqueta.value.itemSeleccionadoVentas
    );
    const archivoCostos = this.listadoCostos.find(
      (it) =>
        it?._id === this.formularioCrearEtiqueta.value.itemSeleccionadoCostos
    );
    this.list1 = archivoCostos?.Informacion?.filter(
      (it) => it.data.etiqueta !== null
    )?.map((item) => item?.data);
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

[
  { data: { codigo: '1', nombre: 'hola' } },
  { data: { codigo: '2', nombre: 'mundo' } },
];
