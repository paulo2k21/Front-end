import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trabalho1Component } from './trabalho1.component';

describe('Trabalho1Component', () => {
  let component: Trabalho1Component;
  let fixture: ComponentFixture<Trabalho1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Trabalho1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Trabalho1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
