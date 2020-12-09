import { TestBed } from '@angular/core/testing';

import { BackendDetailService } from './backend-detail.service';

describe('BackendDetailService', () => {
  let service: BackendDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
