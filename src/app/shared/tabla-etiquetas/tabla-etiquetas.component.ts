import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Etiqueta } from 'src/app/models/Etiqueta';
import { BackendService } from 'src/app/core/services/backend.service';

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
  formularioEditarEtiqueta: FormGroup;
  loading = false;

  constructor(
    private modalService: NgbModal,
    private readonly backendService: BackendService
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
    this.formularioEditarEtiqueta = new FormGroup({
      nombre: new FormControl(this.etiquetaSeleccionada?.Nombre || '', [
        Validators.required,
      ]),
      color: new FormControl(this.etiquetaSeleccionada?.Color, [
        Validators.required,
      ]),
      estado: new FormControl(this.etiquetaSeleccionada?.Estado, [
        Validators.required,
      ]),
      fecha: new FormControl(this.etiquetaSeleccionada?.FechaCreacion || '', [
        Validators.required,
      ]),
    });
  }

  private async handleActualizarEtiqueta(): Promise<void> {
    if (this.formularioEditarEtiqueta?.invalid) {
      alert('Formulario no válido');
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
