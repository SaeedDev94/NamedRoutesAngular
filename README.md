# Angular named routes
As a laravel developer i like to have named routes feature in angular too!

# Install
```
npm install named-routes-angular --save
```

# Add lib to tsconfig.json
```javascript
...
"typeRoots": [
  "node_modules/@types",
  "node_modules/named-routes-angular",
  ...
],
...
```

# Declare custom "namedRoute" pipe in app.module.ts
```typescript
...
import { NamedRoutePipe } from 'named-routes-angular';

@NgModule({
  declarations: [
    ...
    NamedRoutePipe
  ],
  ...
})
export class AppModule {}
```

# Define routes in app-routing.module.ts
```typescript
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { NamedRoutesService } from 'named-routes-angular';

export function routerModule(): ModuleWithProviders {
  const namedRoutes = new NamedRoutesService();
  namedRoutes.group({
    prefix: 'hero',
    name: 'hero.'
  }, [
    {
      path: '',
      component: HeroesComponent,
      data: {
        name: 'index'
      }
    },
    {
      path: '/:id',
      component: HeroDetailComponent,
      data: {
        name: 'edit'
      }
    }
  ]);
  namedRoutes.main('hero.index');
  return RouterModule.forRoot(namedRoutes.all());
}

@NgModule({
  imports: [routerModule()],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

# Use it in view
```html
...
<a [routerLink]="'hero.edit' | namedRoute: [hero.id]">{{ hero.name }}</a>
...
```
