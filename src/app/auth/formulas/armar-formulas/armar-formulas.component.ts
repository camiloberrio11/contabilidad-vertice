import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { BackendService } from 'src/app/core/services/backend.service';
import { Archivo } from 'src/app/models/Archivo';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import Swal from 'sweetalert2';
import { construirArbol } from '../../helpers/archivo';
import { ToastrService } from 'ngx-toastr';

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
  resultadosEnArchivos = false;

  itemsVentas: TreeviewItem[] = [];
  itemsCostos: TreeviewItem[] = [];

  informacionVentas: any[] = [];
  informacionCostos: any[] = [];

  config: TreeviewConfig = {
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    maxHeight: 400,
    decoupleChildFromParent: false,
    hasDivider: true,
  };

  selectedItems = '0';
  selectedItemsMath: number;
  archivoExcel: any[] = [];

  constructor(
    private readonly backendService: BackendService,
    private toastr: ToastrService
  ) {
    this.formBuild();
    this.itemsArbolEstado();
  }

  ngOnInit(): void {
    this.obtenerArchivos();
  }

  onSelectedChangeVentas(event: number[]) {
    console.log(event);
    if (event.length > 0) {
      const sumaConsolidado = event.reduce((acumulador, id) => {
        const objeto = this.informacionVentas?.find(
          (it) => it?.data?.codigo === id
        );
        const consolidado = parseInt(objeto.data.consolidado);
        return acumulador + consolidado;
      }, 0);
      this.changeTextArea(`${this.selectedItems}+${sumaConsolidado}`);
    }
  }

  onSelectedChangeCostos(event: number[]) {
    if (event.length > 0) {
      const sumaConsolidado = event.reduce((acumulador, id) => {
        const objeto = this.informacionCostos?.find(
          (it) => it?.data?.codigo === id
        );
        const consolidado = parseInt(objeto.data.consolidado);
        return acumulador + consolidado;
      }, 0);
      this.changeTextArea(`${this.selectedItems}+${sumaConsolidado}`);
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

  async buscar() {
    try {
      const archivoVentas = this.getArchivoById(
        this.formularioCrearEtiqueta.value.itemSeleccionadoVentas,
        'VENTAS'
      );
      const archivoCostos = this.getArchivoById(
        this.formularioCrearEtiqueta.value.itemSeleccionadoCostos,
        'COSTOS'
      );
      const informacionVentasInfo = await this.getInformacion(
        archivoVentas?._id,
        'ventas'
      );
      const informacionCostosInfo = await this.getInformacion(
        archivoCostos?._id,
        'costos'
      );

      this.informacionVentas = informacionVentasInfo?.data || [];
      this.informacionCostos = informacionCostosInfo?.data || [];

      const resultadoCostos = construirArbol(this.informacionCostos);
      const resultadoVentas = construirArbol(this.informacionVentas);
      this.itemsVentas = resultadoVentas.map((obj: any) => {
        return this.convertToTreeviewItem(obj);
      });
      this.itemsCostos = resultadoCostos.map((obj: any) => {
        return this.convertToTreeviewItem(obj);
      });
      this.resultadosEnArchivos =
        this.itemsCostos?.length > 0 || this.itemsVentas?.length > 0;
    } catch (error) {
      console.log(error);
    }
  }

  getArchivoById(id: string, tipoArchivo: 'VENTAS' | 'COSTOS') {
    if (tipoArchivo === 'COSTOS') {
      const archivoCostos: any = this.listadoCostos.find(
        (it) =>
          it?._id === this.formularioCrearEtiqueta.value.itemSeleccionadoCostos
      );
      return archivoCostos;
    }
    const archivoVentas: any = this.listadoVentas.find(
      (it) =>
        it?._id === this.formularioCrearEtiqueta.value.itemSeleccionadoVentas
    );
    return archivoVentas;
  }

  async getInformacion(id: string, tipoArchivo: string): Promise<any> {
    try {
      const informacion =
        await this.backendService.obtenerInformacionEtiquetados(id);
      return informacion;
    } catch (error: any) {
      const message = error?.error ? error?.error?.message : '';
      this.toastr.error(`${message} para el archivo ${tipoArchivo}`);
    }
  }

  itemsArbolEstado(): void {
    this.itemsVentas?.forEach((item) => {
      item.checked = false;
      if (item.children) {
        item.children.forEach((child) => (child.checked = false));
      }
    });

    this.itemsCostos?.forEach((item) => {
      item.checked = false;
      if (item.children) {
        item.children.forEach((child) => (child.checked = false));
      }
    });
  }

  alertaGuardarItem() {
    Swal.fire({
      title: 'Dale un nombre a la columna a guardar',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const nombreFila = result.value || `${this.archivoExcel?.length}`;
        console.log(nombreFila);
        this.guardarItem(nombreFila);
      }
    });
  }

  guardarItem(name: string): void {
    this.archivoExcel.push({
      id: name,
      value: `${this.selectedItemsMath}`,
    });
    this.changeTextArea(`0`);
    this.itemsArbolEstado();
    this.toastr.success('Item guardado');
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

    try {
      this.loading = true;
      const { data } = await this.backendService.crearArchivoExcel({
        list: this.archivoExcel,
      });
      //const url = window.URL.createObjectURL(blob); // Se crea una URL del objeto Blob

      const dataUrl = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${data}`;
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${nombreArchivo}.xlsx`;
      link.click();
      this.archivoExcel = [];
      this.changeTextArea(`0`);
      this.itemsArbolEstado();
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
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

  // Funcionabilidad libreria
  convertToTreeviewItem(obj: any): TreeviewItem {
    try {
      const item = new TreeviewItem({
        text: obj.data.nombre,
        value: obj.data.codigo,
        checked: false,
        collapsed: true,
      });

      if (obj.children && obj.children?.length > 0) {
        item.children = obj.children.map((child: any) => {
          return this.convertToTreeviewItem(child);
        });
      }

      return item;
    } catch (error) {
      console.log(`Error ${JSON.stringify(error)}`, obj);
      return new TreeviewItem({
        text: '',
        value: '',
        checked: false,
        collapsed: true,
      });
    }
  }
}
