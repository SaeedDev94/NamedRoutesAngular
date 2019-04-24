# Angular named routes
As a laravel developer i like to have named routes feature in angular too!

# Install compiled version
```
npm install named-routes-angular --save
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
...
const routes: Routes = [
  {
    path: 'hero',
    data: {
      name: 'hero'
    },
    children: [
      {
        path: '',
        component: HeroesComponent,
        data: {
          name: 'index'
        }
      },
      {
        path: ':id',
        children: [
          {
            path: 'show',
            component: HeroShowComponent,
            data: {
              name: 'show'
            }
          },
          {
            path: 'edit',
            component: HeroEditComponent,
            data: {
              name: 'edit'
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
...
```

# Use it in view
```html
...
<a [routerLink]="'hero.edit' | namedRoute: [hero.id]">{{ hero.name }}</a>
...
```
