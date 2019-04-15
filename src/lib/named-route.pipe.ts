import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

@Pipe({
  name: 'namedRoute'
})
export class NamedRoutePipe implements PipeTransform {
  constructor(private router: Router) {}

  transform(value: string, params = []): string {
    let path = null;
    const routes = this.router.config;
    for (let i = 0 ; routes.length > i ; i++) {
      const route = routes[i];
      if (typeof route.data === 'undefined' || typeof route.data.name === 'undefined') {
        continue;
      }
      if (route.data.name === value) {
        path = route.path;
        break;
      }
    }
    if (path === null) {
      throw new Error('not found any route with given name: "' + value + '"');
    }
    const pathParts = path.split('/');
    for (let i = 0 ; pathParts.length > i ; i++) {
      if (pathParts[i].indexOf(':') === -1) {
        continue;
      }
      pathParts[i] = params.shift();
    }
    return '/' + pathParts.join('/');
  }
}
