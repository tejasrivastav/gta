import { TestBed, inject } from '@angular/core/testing';

import { GraphserviceService } from './graph.service';

describe('GraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphserviceService]
    });
  });

  it('should be created', inject([GraphserviceService], (service: GraphserviceService) => {
    expect(service).toBeTruthy();
  }));
});
