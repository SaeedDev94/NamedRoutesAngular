import { TestBed } from '@angular/core/testing';

import { NamedRoutesService } from './named-routes.service';

describe('NamedRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NamedRoutesService = TestBed.get(NamedRoutesService);
    expect(service).toBeTruthy();
  });
});
