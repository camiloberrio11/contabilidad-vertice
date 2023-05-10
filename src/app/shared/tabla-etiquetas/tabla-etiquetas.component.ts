import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Etiqueta } from 'src/app/models/Etiqueta';
import { BackendService } from 'src/app/core/services/backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tabla-etiquetas',
  templateUrl: './tabla-etiquetas.component.html',
  styleUrls: ['./tabla-etiquetas.component.css']
})
export class TablaEtiquetasComponent implements OnInit {
  @Output() recargarListaEtiquetas = new EventEmitter<void>();
  // @Output() buscarObra = new EventEmitter<string>();
  @Input() listaEtiquetas: Etiqueta[];
  etiquetaSeleccionada: Etiqueta;
  formularioEditarEtiqueta: UntypedFormGroup;
  loading = false;

  constructor(
    private modalService: NgbModal,
    private readonly backendService: BackendService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  abrirModalEditar(component: any, etiqueta: Etiqueta) {
    this.etiquetaSeleccionada = etiqueta;
    this.formBuild();
    this.modalService
      .open(component, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // Save click
          this.handleActualizarEtiqueta();

        },
        (reason) => {
          console.log(reason);
        }
      );
  }

  private formBuild(): void {
    this.formularioEditarEtiqueta = new UntypedFormGroup({
      nombre: new UntypedFormControl(this.etiquetaSeleccionada?.Nombre || '', [
        Validators.required,
      ]),
      color: new UntypedFormControl(this.etiquetaSeleccionada?.Color, [
        Validators.required,
      ]),
      estado: new UntypedFormControl(this.etiquetaSeleccionada?.Estado, [
        Validators.required,
      ]),
      fecha: new UntypedFormControl(this.etiquetaSeleccionada?.FechaCreacion || '', [
        Validators.required,
      ]),
    });
  }

  private async handleActualizarEtiqueta(): Promise<void> {
    if (this.formularioEditarEtiqueta?.invalid) {
      this.toastr.error('Formulario no válido');
      return;
    }
    this.loading = true;
    const value = this.formularioEditarEtiqueta?.value;
    try {
      await this.backendService.actualizarEtiqueta(this.etiquetaSeleccionada?._id, {
        Nombre: value?.nombre,
        Estado: value?.estado,
        FechaCreacion: value?.fecha,
        Color: value?.color,
      });
      this.loading = false;
      this.etiquetaSeleccionada = null!;
      this.recargarListaEtiquetas.emit();
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }

}
