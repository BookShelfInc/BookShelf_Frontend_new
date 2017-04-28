import { TestBed, inject } from '@angular/core/testing';

import { BazaarService } from './bazaar.service';

describe('BazaarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BazaarService]
    });
  });

  it('should ...', inject([BazaarService], (service: BazaarService) => {
    expect(service).toBeTruthy();
  }));
});
