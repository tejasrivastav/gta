import { TestBed, inject } from '@angular/core/testing';

import { WofService } from './wof.service';

describe('WofService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WofService]
    });
  });

  it('should be created', inject([WofService], (service: WofService) => {
    expect(service).toBeTruthy();
  }));
});
