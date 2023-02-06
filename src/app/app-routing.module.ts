import { CargarArchivoComponent } from './auth/procesamiento/cargar-archivo/cargar-archivo.component';
import { EtiquetasComponent } from './auth/etiquetas/etiquetas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';











// import { NestableComponent } from './plugins/nestable/nestable.component';
// import { LightGalleryComponent } from './plugins/light-gallery/light-gallery.component';



import { ObrasComponent } from './auth/obras/obras.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'obra', component: ObrasComponent },
      { path: 'etiqueta', component: EtiquetasComponent },
      { path: 'cargaarchivo', component: CargarArchivoComponent },

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
