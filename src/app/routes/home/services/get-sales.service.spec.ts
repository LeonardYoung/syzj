import { TestBed } from '@angular/core/testing';

import { GetSalesService } from './get-sales.service';

describe('GetSalesService', () => {
  let service: GetSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
