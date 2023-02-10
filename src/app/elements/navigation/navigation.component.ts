import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationBar } from './Navigation';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  public currentHref: string = '';
  administracionList: NavigationBar = {
    father: 'Administacion',
    childrens: [
      { path: '/admin/obra', name: 'Crear obra' },
      { path: '/admin/etiqueta', name: 'Crear etiqueta' },
    ],
  };
  procesamientoList: NavigationBar = {
    father: 'Procesamiento',
    childrens: [
      { path: '/admin/cargaarchivo', name: 'Cargar archivo' },
      { path: '/admin/historial-archivos', name: 'Historial de archivos' },
    ],
  };

  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.currentHref = location.path();
      } else {
        this.currentHref = 'Home';
      }
    });
  }

  ngOnInit(): void {}

  toggleIcon: boolean = true;

  toggleLoveIcon() {
    this.toggleIcon = !this.toggleIcon;
  }

  validarRuta(listaRutas: NavigationBar): boolean {
    return !!listaRutas.childrens.find((it) => it?.path === this.currentHref);
  }


}
