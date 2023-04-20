import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmarFormulasComponent } from './armar-formulas.component';

describe('ArmarFormulasComponent', () => {
  let component: ArmarFormulasComponent;
  let fixture: ComponentFixture<ArmarFormulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmarFormulasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmarFormulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
