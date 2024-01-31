import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trabalho2Component } from './trabalho2.component';

describe('Trabalho2Component', () => {
  let component: Trabalho2Component;
  let fixture: ComponentFixture<Trabalho2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Trabalho2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Trabalho2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
