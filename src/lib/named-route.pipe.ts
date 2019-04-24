import { Pipe, PipeTransform } from '@angular/core';
import { NamedRoutesService } from './named-routes.service';

@Pipe({
  name: 'namedRoute'
})
export class NamedRoutePipe implements PipeTransform {

  constructor(private namedRoutesService: NamedRoutesService) {}

  transform(value: string, params = []): string {
    const namedRoutes = this.namedRoutesService.getNamedRoutes();
    const namedRoute = namedRoutes.find(route => {
      return route.name === value;
    });
    if (!namedRoute) {
      throw new Error('not found any route with given name: "' + value + '"');
    }
    const pathParts = namedRoute.path.split('/');
    for (let i = 0 ; pathParts.length > i ; i++) {
      if (pathParts[i].indexOf(':') === -1) {
        continue;
      }
      pathParts[i] = params.shift();
    }
    return pathParts.join('/');
  }
}
