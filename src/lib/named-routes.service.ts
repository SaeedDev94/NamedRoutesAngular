import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NamedRoutesService {
  routes: Routes = [];

  add(routes: Routes): void {
    for (let i = 0 ; routes.length > i ; i++) {
      const route = routes[i];
      this.routes.push(route);
    }
  }

  group(options: any, routes: Routes): void {
    for (let i = 0 ; routes.length > i ; i++) {
      const route = routes[i];
      if (typeof options.prefix !== 'undefined') {
        route.path = options.prefix + route.path;
      }
      if (typeof options.name !== 'undefined' && typeof route.data !== 'undefined' && route.data.name !== 'undefined') {
        route.data.name = options.name + route.data.name;
      }
      this.routes.push(route);
    }
  }

  main(name: string): void {
    const theRoute = this.routes.find(route => {
      if (typeof route.data === 'undefined') {
        return false;
      }
      if (typeof route.data.name === 'undefined') {
        return false;
      }
      return route.data.name === name;
    });
    if (typeof theRoute === 'undefined') {
      throw new Error('route not found');
    }
    this.routes.push({
      path: '',
      redirectTo: '/' + theRoute.path,
      pathMatch: 'full'
    });
  }

  all(): Routes {
    return this.routes;
  }
}
