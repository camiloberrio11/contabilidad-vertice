import { Component, Input } from '@angular/core';
import { TipoArchivo } from 'src/app/models/TipoArchivo';

@Component({
  selector: 'app-tabla-tipo-archivo',
  templateUrl: './tabla-tipo-archivo.component.html',
  styleUrls: ['./tabla-tipo-archivo.component.css'],
})
export class TablaTipoArchivoComponent {
  @Input() listado: TipoArchivo[];
}
