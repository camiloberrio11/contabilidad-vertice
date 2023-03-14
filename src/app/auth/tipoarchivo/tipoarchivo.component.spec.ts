import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoarchivoComponent } from './tipoarchivo.component';

describe('TipoarchivoComponent', () => {
  let component: TipoarchivoComponent;
  let fixture: ComponentFixture<TipoarchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoarchivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoarchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
