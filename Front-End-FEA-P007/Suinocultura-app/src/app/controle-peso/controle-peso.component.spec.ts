import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlePesoComponent } from './controle-peso.component';

describe('ControlePesoComponent', () => {
  let component: ControlePesoComponent;
  let fixture: ComponentFixture<ControlePesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlePesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlePesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
