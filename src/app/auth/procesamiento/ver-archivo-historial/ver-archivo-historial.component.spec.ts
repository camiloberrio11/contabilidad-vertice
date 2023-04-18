import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerArchivoHistorialComponent } from './ver-archivo-historial.component';

describe('VerArchivoHistorialComponent', () => {
  let component: VerArchivoHistorialComponent;
  let fixture: ComponentFixture<VerArchivoHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerArchivoHistorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerArchivoHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
