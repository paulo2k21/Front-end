import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAvesComponent } from './cadastro-aves.component';

describe('CadastroAvesComponent', () => {
  let component: CadastroAvesComponent;
  let fixture: ComponentFixture<CadastroAvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAvesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroAvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
