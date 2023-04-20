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

@Component({
  selector: 'app-armar-formulas',
  templateUrl: './armar-formulas.component.html',
  styleUrls: ['./armar-formulas.component.css'],
})
export class ArmarFormulasComponent implements OnInit {
  loading = false;
  formularioCrearEtiqueta: UntypedFormGroup;
  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost
    effectAllowed: 'all',
    disable: false,
    handle: false
  };
  listItems = [
    { id: 1, name: 'item1', children: [] },
    { id: 2, name: 'item2', children: [] }
  ];
  dropedItems = [];

  listadoVentas: any[] = [
    { Nombre: 'ARCHIVO 1 VENTAS', _id: 1 },
    { Nombre: 'ARCHIVO 2 VENTAS', _id: 2 },
    { Nombre: 'ARCHIVO 3 VENTAS', _id: 3 },
    { Nombre: 'ARCHIVO 4 VENTAS', _id: 4 },
  ];
  listadoCostos: any[] = [
    { Nombre: 'ARCHIVO 1 COSTOS', _id: 1 },
    { Nombre: 'ARCHIVO 2 COSTOS', _id: 2 },
    { Nombre: 'ARCHIVO 3 COSTOS', _id: 3 },
    { Nombre: 'ARCHIVO 4 COSTOS', _id: 4 },
    { Nombre: 'ARCHIVO 5 COSTOS', _id: 5 },
    { Nombre: 'ARCHIVO 6 COSTOS', _id: 6 },
  ];
  constructor() {
    this.formBuild();
  }

  ngOnInit(): void {}


  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = list.length;
      }
      event.data.index = index;
      list.splice(index, 0, event.data);
    }
    console.log('dropped', JSON.stringify(event, null, 2));
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
