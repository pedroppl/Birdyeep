import { TestBed } from '@angular/core/testing';

import { GetProviderService } from './get-provider.service';

describe('GetProviderService', () => {
  let service: GetProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
