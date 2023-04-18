import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegistroArchivoItem } from 'src/app/models/Archivo';
import { construirArbol } from '../../helpers/archivo';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Etiqueta } from 'src/app/models/Etiqueta';
import { BackendService } from 'src/app/core/services/backend.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ver-archivo-historial',
  templateUrl: './ver-archivo-historial.component.html',
  styleUrls: ['./ver-archivo-historial.component.css'],
})
export class VerArchivoHistorialComponent {
  files1: any[] = [];
  loading = false;
  listadoEtiquetas: Etiqueta[] = [];
  formularioAsignarEtiqueta: UntypedFormGroup;
  state: any;

  constructor(
    private route: Router,
    private modalService: NgbModal,
    private backendService: BackendService
  ) {
    this.formBuild();
    this.state = this.route.getCurrentNavigation()?.extras?.state;
    if (!this.state?.id) {
      this.route?.navigate(['admin/historial-archivos']);
      return;
    }
    console.log(this.state?.info)
    this.mappearArchivo(this.state?.info);
    this.formularioAsignarEtiqueta.patchValue({idArchivoCreado: this?.state?.id})
  }

  async guardarEtiqueta(): Promise<void> {
    try {
      this.loading = true;
      const etiqueta: any = this.listadoEtiquetas.find(
        (it) => it?._id === this.formularioAsignarEtiqueta.value?.etiqueta
      );
      console.log(this.formularioAsignarEtiqueta.value);
      const result = await this.backendService.asignarEtiqueta({
        codigo: this.formularioAsignarEtiqueta.value?.seleccionado?.codigo,
        idArchivo: this.formularioAsignarEtiqueta.value?.idArchivoCreado,
        etiqueta,
      });
      console.log(result);
      this.mappearArchivo(result.data);
      this.loading = false;
      this.modalService.dismissAll();
    } catch (error) {
      this.loading = false;
      console.log(error);
      this.loading = false;
      this.modalService.dismissAll();
    }
  }

  async openModalTags(
    component: TemplateRef<any>,
    item: {
      nombre: string;
      codigo: string;
      consolidado: string;
    }
  ): Promise<void> {
    console.log(item);
    try {

      this.loading = true;
      this.listadoEtiquetas = (
        await this.backendService.listarEtiquetas()
      )?.data;
      this.loading = false;
      this.formBuild();
      this.formularioAsignarEtiqueta.patchValue({ seleccionado: item });
      await this.modalService.open(component, {
        ariaLabelledBy: 'modal-basic-title',
      }).result;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log('Error en modal', error);
    }
  }

  private mappearArchivo(listadoArchivo: RegistroArchivoItem[]): void {
    this.loading = true;
    this.files1 = construirArbol(listadoArchivo);
    this.loading = false;
  }

  private formBuild() {
    console.log(this.route.getCurrentNavigation()?.extras.state?.id)
    this.formularioAsignarEtiqueta = new UntypedFormGroup({
      etiqueta: new UntypedFormControl(this.listadoEtiquetas[0]?._id, [
        Validators.required,
      ]),
      seleccionado: new UntypedFormControl('', [Validators.required]),
      idArchivoCreado: new UntypedFormControl(this.state?.id, [Validators.required]),
    });
  }
}
