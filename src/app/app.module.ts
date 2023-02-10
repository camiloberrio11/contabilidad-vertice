import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedService } from './shared.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NestableModule } from 'ngx-nestable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LightboxModule } from 'ngx-lightbox';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

import { MetismenuAngularModule } from '@metismenu/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

/* #########################  SITE PAGES COMPONENT ###################*/

import { AdminComponent } from './admin/admin.component';
import { LoadingComponent } from './elements/loading/loading.component';
import { NavHeaderComponent } from './elements/nav-header/nav-header.component';
import { NavigationComponent } from './elements/navigation/navigation.component';
import { HeaderComponent } from './elements/header/header.component';
import { FooterComponent } from './elements/footer/footer.component';

import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';

import { ObrasComponent } from './auth/obras/obras.component';
import { EtiquetasComponent } from './auth/etiquetas/etiquetas.component';
import { NgxLoadingModule } from 'ngx-loading';
import { TablaObrasComponent } from './shared/tabla-obras/tabla-obras.component';
import { TablaEtiquetasComponent } from './shared/tabla-etiquetas/tabla-etiquetas.component';
import { CargarArchivoComponent } from './auth/procesamiento/cargar-archivo/cargar-archivo.component';
import { HistorialArchivoComponent } from './auth/procesamiento/historial-archivo/historial-archivo.component';

@NgModule({
  declarations: [
    AppComponent,


    AdminComponent,
    NavHeaderComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,

    LoginComponent,

    Error404Component,

    ObrasComponent,
    EtiquetasComponent,
    TablaObrasComponent,
    TablaEtiquetasComponent,
    CargarArchivoComponent,
    HistorialArchivoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxLoadingModule.forRoot({}),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ChartsModule,
    NgApexchartsModule,
    NestableModule,
    NgxSpinnerModule,
    LightboxModule,
    FullCalendarModule,
    MetismenuAngularModule,
    PerfectScrollbarModule,
    NgxDropzoneModule,
    CarouselModule,


    MatSlideToggleModule,
    MatIconModule,

  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
