import { TestBed } from '@angular/core/testing';

import { ConfirmOrderService } from './confirm-order.service';

describe('ConfirmOrderService', () => {
  let service: ConfirmOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
