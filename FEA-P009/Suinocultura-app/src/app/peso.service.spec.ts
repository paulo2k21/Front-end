import { TestBed } from '@angular/core/testing';

import { PesoService } from './peso.service';

describe('PesoService', () => {
  let service: PesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
