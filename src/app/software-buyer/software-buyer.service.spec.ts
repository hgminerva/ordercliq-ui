import { TestBed } from '@angular/core/testing';

import { SoftwareBuyerService } from './software-buyer.service';

describe('SoftwareBuyerService', () => {
  let service: SoftwareBuyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftwareBuyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
