import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Obra } from 'src/app/models/Obra';
import { BackendService } from 'src/app/core/services/backend.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabla-obras',
  templateUrl: './tabla-obras.component.html',
  styleUrls: ['./tabla-obras.component.css'],
})
export class TablaObrasComponent implements OnInit, OnChanges {
  @Output() recargarListaObras = new EventEmitter<void>();
  @Output() buscarObra = new EventEmitter<string>();
  @Input() listaObras: Obra[];
  obraSelected: Obra;
  formularioEditarObra: UntypedFormGroup;
  loading = false;

  constructor(
    private modalService: NgbModal,
    private readonly backendService: BackendService // public service: CountryService
  ) {
  }
  ngOnInit(): void {}

  abrirModalEditar(component: any, obra: Obra) {
    this.obraSelected = obra;
    this.formBuild();
    this.modalService
      .open(component, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // Save click
          this.handleActualizarObra();

        },
        (reason) => {
          console.log(reason);
        }
      );
  }

  ngOnChanges(): void {
    console.log(this.listaObras);
  }

  buscar(event: any): void {
    const value = event?.target?.value;
    this.buscarObra?.emit(value);
  }

  private async handleActualizarObra(): Promise<void> {
    if (this.formularioEditarObra?.invalid) {
      alert('Formulario no válido');
      return;
    }
    this.loading = true;
    const value = this.formularioEditarObra?.value;
    try {
      await this.backendService.actualizarObra(this.obraSelected?._id, {
        Nombre: value?.nombre,
        Estado: value?.estado,
        FechaCreacion: value?.fecha,
      });
      this.loading = false;
      this.obraSelected = null!;
      this.recargarListaObras.emit();
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }

  private formBuild(): void {
    this.formularioEditarObra = new UntypedFormGroup({
      nombre: new UntypedFormControl(this.obraSelected?.Nombre || '', [
        Validators.required,
      ]),
      estado: new UntypedFormControl(this.obraSelected?.Estado, [
        Validators.required,
      ]),
      fecha: new UntypedFormControl(this.obraSelected?.FechaCreacion || '', [
        Validators.required,
      ]),
    });
  }
}
