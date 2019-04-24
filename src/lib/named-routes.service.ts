import { Injectable } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';

export interface NamedRoutes {
  path: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class NamedRoutesService {

  private id = 0;
  private namedRoutes: NamedRoutes[] = [];
  private routes: Routes = [];
  private endPoints: Routes = [];

  constructor(private router: Router) {
    this.init();
  }

  static setNodeData(node: Route, name: string, value: any): Route {
    if (typeof node.data === 'undefined') {
      node.data = {};
    }
    node.data[name] = value;
    return node;
  }

  init(): void {
    const routes: Routes = this.router.config;
    let route: Route;
    for (let i = 0 ; routes.length > i ; i++) {
      route = routes[i];
      this.setRoutes(route);
    }
    while (this.endPoints.length > 0) {
      route = this.endPoints.shift();
      this.setNamedRoutes(route);
    }
  }

  setRoutes(root: Route): void {
    root = NamedRoutesService.setNodeData(root, 'parent', 0);
    const stack = [];
    stack.unshift(root);
    while (stack.length > 0) {
      let node = stack.shift();
      node = NamedRoutesService.setNodeData(node, 'id', this.getId());
      this.routes.push(node);
      if (typeof node.component !== 'undefined') {
        this.endPoints.push(node);
      }
      if (Array.isArray(node.children) && node.children.length > 0) {
        for (let i = node.children.length - 1 ; i >= 0 ; i--) {
          let child = node.children[i];
          child = NamedRoutesService.setNodeData(child, 'parent', node.data.id);
          stack.unshift(child);
        }
      }
    }
  }

  getId(): number {
    return ++this.id;
  }

  setNamedRoutes(child: Route): void {
    const paths = [];
    const names = [];
    const stack = [];
    stack.unshift(child);
    while (stack.length > 0) {
      const node = stack.shift();
      if (typeof node.path === 'string' && node.path.trim().length > 0) {
        paths.unshift(node.path.trim());
      }
      if (typeof node.data.name === 'string' && node.data.name.trim().length > 0) {
        names.unshift(node.data.name.trim());
      }
      if (node.data.parent !== 0) {
        const parent = this.routes.find(route => {
          return route.data.id === node.data.parent;
        });
        stack.unshift(parent);
      }
    }
    this.namedRoutes.push({
      path: '/' + paths.join('/'),
      name: names.join('.')
    });
  }

  getNamedRoutes(): NamedRoutes[] {
    return this.namedRoutes;
  }
}
