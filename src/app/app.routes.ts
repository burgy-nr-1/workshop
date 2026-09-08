import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./workshop/workshop-home.component').then(
        ({ WorkshopHomeComponent }) => WorkshopHomeComponent,
      ),
    title: 'Angular 22 Workshop',
  },
  {
    path: 'tasks/:slug',
    loadComponent: () =>
      import('./shared/task-shell/task-shell.component').then(
        ({ TaskShellComponent }) => TaskShellComponent,
      ),
    title: 'Challenge · Angular 22 Workshop',
  },
  { path: '**', redirectTo: '' },
];
