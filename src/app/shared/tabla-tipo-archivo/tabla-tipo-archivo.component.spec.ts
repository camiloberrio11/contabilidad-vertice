import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoArchivoComponent } from './tabla-tipo-archivo.component';

describe('TablaTipoArchivoComponent', () => {
  let component: TablaTipoArchivoComponent;
  let fixture: ComponentFixture<TablaTipoArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaTipoArchivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaTipoArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
