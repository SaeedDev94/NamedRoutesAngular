import { NamedRoutePipe } from './named-route.pipe';
import { TestBed } from '@angular/core/testing';
import { NamedRoutesService } from './named-routes.service';

describe('NamedRoutePipe', () => {
  it('create an instance', () => {
    const namedRoutesService = TestBed.get(NamedRoutesService);
    const pipe = new NamedRoutePipe(namedRoutesService);
    expect(pipe).toBeTruthy();
  });
});
