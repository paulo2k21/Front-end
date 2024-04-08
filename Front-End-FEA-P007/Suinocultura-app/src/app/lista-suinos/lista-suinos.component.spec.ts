import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSuinosComponent } from './lista-suinos.component';

describe('ListaSuinosComponent', () => {
  let component: ListaSuinosComponent;
  let fixture: ComponentFixture<ListaSuinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSuinosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSuinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
