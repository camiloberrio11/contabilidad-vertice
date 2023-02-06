import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEtiquetasComponent } from './tabla-etiquetas.component';

describe('TablaEtiquetasComponent', () => {
  let component: TablaEtiquetasComponent;
  let fixture: ComponentFixture<TablaEtiquetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaEtiquetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEtiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
