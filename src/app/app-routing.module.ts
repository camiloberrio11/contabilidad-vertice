import { CargarArchivoComponent } from './auth/procesamiento/cargar-archivo/cargar-archivo.component';
import { EtiquetasComponent } from './auth/etiquetas/etiquetas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { ObrasComponent } from './auth/obras/obras.component';
import { HistorialArchivoComponent } from './auth/procesamiento/historial-archivo/historial-archivo.component';
import { VerArchivoHistorialComponent } from './auth/procesamiento/ver-archivo-historial/ver-archivo-historial.component';
import { ArmarFormulasComponent } from './auth/formulas/armar-formulas/armar-formulas.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'obra', component: ObrasComponent },
      { path: 'etiqueta', component: EtiquetasComponent },
      { path: 'cargaarchivo', component: CargarArchivoComponent },
      { path: 'historial-archivos', component: HistorialArchivoComponent },
      { path: 'verarchivo', component: VerArchivoHistorialComponent },
      { path: 'crearformula', component: ArmarFormulasComponent },

    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
