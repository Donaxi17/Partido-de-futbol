import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Equipo2Component } from './equipo-2.component';

describe('Equipo2Component', () => {
  let component: Equipo2Component;
  let fixture: ComponentFixture<Equipo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Equipo2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Equipo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
