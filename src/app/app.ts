import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkshopHeaderComponent } from './workshop/workshop-header.component';

@Component({
  imports: [RouterOutlet, WorkshopHeaderComponent],
  selector: 'app-root',
  template: `
    <app-workshop-header />
    <main class="app-main">
      <router-outlet />
    </main>
  `,
})
export class App {}
