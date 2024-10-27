import { TestBed } from '@angular/core/testing';

import { ApicontrollerService } from './apicontroller.service';

describe('ApicontrollerService', () => {
  let service: ApicontrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicontrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
