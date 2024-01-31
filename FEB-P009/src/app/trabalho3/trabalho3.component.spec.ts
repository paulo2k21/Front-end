import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trabalho3Component } from './trabalho3.component';

describe('Trabalho3Component', () => {
  let component: Trabalho3Component;
  let fixture: ComponentFixture<Trabalho3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Trabalho3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Trabalho3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
