import { NamedRoutePipe } from './named-route.pipe';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('NamedRoutePipe', () => {
  it('create an instance', () => {
    const router = TestBed.get(Router);
    const pipe = new NamedRoutePipe(router);
    expect(pipe).toBeTruthy();
  });
});
