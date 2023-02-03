import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaObrasComponent } from './tabla-obras.component';

describe('TablaObrasComponent', () => {
  let component: TablaObrasComponent;
  let fixture: ComponentFixture<TablaObrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaObrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
