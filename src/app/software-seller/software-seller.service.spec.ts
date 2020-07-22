import { TestBed } from '@angular/core/testing';

import { SoftwareSellerService } from './software-seller.service';

describe('SoftwareSellerService', () => {
  let service: SoftwareSellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftwareSellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
