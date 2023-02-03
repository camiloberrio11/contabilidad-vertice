import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Obra } from 'src/app/models/Obra';

@Component({
  selector: 'app-tabla-obras',
  templateUrl: './tabla-obras.component.html',
  styleUrls: ['./tabla-obras.component.css']
})
export class TablaObrasComponent implements OnInit, OnChanges {
  @Input() listaObras: Obra[];



  // countries$: Observable<Country[]>;
  // total$: Observable<any>;

  // @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    // public service: CountryService
    ) {
    // this.countries$ = service.countries$;
    // this.total$ = service.total$;
  }

  // onSort({column, direction}: SortEvent) {

  //   // resetting other headers
  //   this.headers.forEach(header => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });

  //   this.service.sortColumn = column;
  //   this.service.sortDirection = direction;
  // }
  ngOnInit(): void {
    console.log(this.listaObras)
  }

  ngOnChanges(): void {
    console.log(this.listaObras)
  }

}
