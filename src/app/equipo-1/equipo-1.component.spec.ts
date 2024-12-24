import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Equipo1Component } from './equipo-1.component';

describe('Equipo1Component', () => {
  let component: Equipo1Component;
  let fixture: ComponentFixture<Equipo1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Equipo1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Equipo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
