import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAvesComponent } from './editar-aves.component';

describe('EditarAvesComponent', () => {
  let component: EditarAvesComponent;
  let fixture: ComponentFixture<EditarAvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAvesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
