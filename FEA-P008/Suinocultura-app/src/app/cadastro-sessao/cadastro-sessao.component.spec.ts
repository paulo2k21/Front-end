import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroSessaoComponent } from './cadastro-sessao.component';

describe('CadastroSessaoComponent', () => {
  let component: CadastroSessaoComponent;
  let fixture: ComponentFixture<CadastroSessaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroSessaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroSessaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
