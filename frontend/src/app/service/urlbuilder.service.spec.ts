import { TestBed, inject } from '@angular/core/testing';

import { UrlbuilderService } from './urlbuilder.service';

describe('UrlbuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlbuilderService]
    });
  });

  it('should be created', inject([UrlbuilderService], (service: UrlbuilderService) => {
    expect(service).toBeTruthy();
  }));
});
