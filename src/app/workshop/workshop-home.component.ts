import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WORKSHOP_TASKS } from '../data/workshop-tasks';
import { ProgressService } from '../shared/progress.service';

@Component({
  selector: 'app-workshop-home',
  imports: [RouterLink],
  template: `
    <div class="page home-page">
      <section class="hero" aria-labelledby="workshop-title">
        <div>
          <p class="eyebrow">Tech &amp; Learn · Interactive workshop</p>
          <h1 id="workshop-title">Angular 22</h1>
          <p class="hero-topic">OnPush <span>·</span> Zoneless <span>·</span> Signals</p>
          <p class="hero-copy">Fix real Angular problems. Learn why they happen.</p>
        </div>

        <aside class="progress-card" aria-label="Workshop progress">
          <div class="progress-label">
            <span>Progress</span>
            <strong>{{ progress.solvedCount() }} / {{ progress.totalCount }} solved</strong>
          </div>
          <div
            class="progress-track"
            role="progressbar"
            [attr.aria-valuenow]="progress.solvedCount()"
            aria-valuemin="0"
            [attr.aria-valuemax]="progress.totalCount"
          >
            <span [style.width.%]="progress.percent()"></span>
          </div>
          <button class="text-button" type="button" (click)="progress.reset()">
            Reset progress only
          </button>
        </aside>
      </section>

      <section class="how-it-works" aria-labelledby="how-title">
        <div class="section-heading">
          <p class="eyebrow">Participant flow</p>
          <h2 id="how-title">How it works</h2>
        </div>
        <ol>
          <li><span>01</span>Open a challenge</li>
          <li><span>02</span>Edit the indicated Angular file</li>
          <li><span>03</span>Fix the behavior</li>
          <li><span>04</span>Check your solution</li>
        </ol>
      </section>

      <section class="challenge-section" aria-labelledby="challenges-title">
        <div class="section-heading challenge-heading">
          <div>
            <p class="eyebrow">Seven independent exercises</p>
            <h2 id="challenges-title">Choose a challenge</h2>
          </div>
          <p>Start anywhere. Each challenge stands on its own.</p>
        </div>

        <div class="challenge-grid">
          @for (task of tasks; track task.id) {
            <a
              class="challenge-card"
              [class.solved]="progress.isSolved(task.id)"
              [routerLink]="['/tasks', task.slug]"
            >
              <div class="card-topline">
                <span class="challenge-number">{{ task.number.toString().padStart(2, '0') }}</span>
                <span class="difficulty">{{ task.difficulty }}</span>
              </div>
              <p class="card-category">{{ task.category }}</p>
              <h3>{{ task.title }}</h3>
              <p class="card-concept">{{ task.concept }}</p>
              <div class="card-footer">
                <span>{{ task.estimatedMinutes }}</span>
                <span class="card-status">
                  @if (progress.isSolved(task.id)) {
                    ✓ Solved
                  } @else {
                    Not started
                  }
                </span>
              </div>
              <span class="card-cta">Open challenge <span aria-hidden="true">→</span></span>
            </a>
          }
        </div>
      </section>
    </div>
  `,
})
export class WorkshopHomeComponent {
  protected readonly tasks = WORKSHOP_TASKS;
  protected readonly progress = inject(ProgressService);
}
