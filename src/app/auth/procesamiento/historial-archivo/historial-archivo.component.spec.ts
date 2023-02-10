import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialArchivoComponent } from './historial-archivo.component';

describe('HistorialArchivoComponent', () => {
  let component: HistorialArchivoComponent;
  let fixture: ComponentFixture<HistorialArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialArchivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
