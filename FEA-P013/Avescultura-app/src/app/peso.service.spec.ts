import { TestBed } from '@angular/core/testing';

import { AvesService } from './aves.service';

describe('PesoService', () => {
  let service: AvesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
