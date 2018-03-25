import { TestBed, inject } from '@angular/core/testing';

import { CarnumApiService } from './carnum-api.service';

describe('CarnumApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarnumApiService]
    });
  });

  it('should be created', inject([CarnumApiService], (service: CarnumApiService) => {
    expect(service).toBeTruthy();
  }));
});
