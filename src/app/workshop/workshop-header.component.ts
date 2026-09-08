import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-workshop-header',
  imports: [RouterLink],
  template: `
    <header class="site-header">
      <a class="brand" routerLink="/" aria-label="Workshop home">
        <span class="brand-mark" aria-hidden="true">A22</span>
        <span>
          <strong>Tech &amp; Learn</strong>
          <small>euregon development</small>
        </span>
      </a>
      <div class="header-topic">
        <strong>Angular 22</strong>
        <span>OnPush · Zoneless · Signals</span>
      </div>
    </header>
  `,
})
export class WorkshopHeaderComponent {}
