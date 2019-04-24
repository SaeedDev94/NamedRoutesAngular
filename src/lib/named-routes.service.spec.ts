import { NamedRoutesService } from './named-routes.service';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('NamedRoutesService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NamedRoutesService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['config'])
        }
      ]
    });
  });

  it('should be created', () => {
    const namedRoutesService = TestBed.get(NamedRoutesService);
    expect(namedRoutesService).toBeTruthy();
  });
});
