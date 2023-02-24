import { BackendService } from 'src/app/core/services/backend.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Etiqueta } from 'src/app/models/Etiqueta';

@Component({
  selector: 'app-etiquetas',
  templateUrl: './etiquetas.component.html',
  styleUrls: ['./etiquetas.component.css'],
})
export class EtiquetasComponent implements OnInit {
  formularioCrearEtiqueta: UntypedFormGroup;
  loading = false;
  listaEtiquetas: Etiqueta[] = [];

  constructor(private readonly backendService: BackendService) {}

  ngOnInit(): void {
    this.formBuild();
    this.listarEtiquetas();
  }

  handleNombreEtiqueta(event: any): void {
    const {value} = event?.target;
    this.formularioCrearEtiqueta.patchValue({ nombre: value?.toUpperCase() });
  }

  async handleGuardarEtiqueta(): Promise<void> {
    try {
      if (this.formularioCrearEtiqueta?.invalid) {
        alert('Formulario invalido');
        return;
      }
      this.loading = true;
      const values = this.formularioCrearEtiqueta?.value;
      await this.backendService.crearEtiqueta({
        nombre: values?.nombre,
        color: values?.color,
      });
      this.loading = false;
      this.listarEtiquetas();
      alert('Etiqueta creada');
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }

  async listarEtiquetas(): Promise<void> {
    try {
      this.loading = true;
      this.listaEtiquetas = (await this.backendService.listarEtiquetas()).data;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }

  private formBuild(): void {
    this.formularioCrearEtiqueta = new UntypedFormGroup({
      nombre: new UntypedFormControl('', [Validators.required]),
      color: new UntypedFormControl('#221b34', [Validators.required]),
    });
  }
}
