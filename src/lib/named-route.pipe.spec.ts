import { NamedRoutePipe } from './named-route.pipe';
import { NamedRoutesService } from './named-routes.service';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

describe('NamedRoutePipe', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NamedRoutePipe,
        NamedRoutesService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['config'])
        }
      ]
    });
  });

  it('create an instance', () => {
    const pipe = TestBed.get(NamedRoutePipe);
    expect(pipe).toBeTruthy();
  });
});
