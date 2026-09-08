import { Component, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WORKSHOP_TASKS, findTask } from '../../data/workshop-tasks';
import { TASK_COMPONENTS } from '../../tasks/task-components';
import { ProgressService } from '../progress.service';
import { TaskCheckerService } from '../task-checker/task-checker.service';
import { TaskCheckResult } from '../task-checker/task-checker.types';
import { TaskRunnerComponent } from '../task-runner/task-runner.component';

@Component({
  selector: 'app-task-shell',
  imports: [RouterLink, TaskRunnerComponent],
  template: `
    @if (task(); as currentTask) {
      <div class="page challenge-page">
        <nav class="challenge-nav" aria-label="Challenge navigation">
          <a routerLink="/" class="back-link"><span aria-hidden="true">←</span> All challenges</a>
          <span
            >Challenge {{ currentTask.number.toString().padStart(2, '0') }} /
            {{ tasks.length.toString().padStart(2, '0') }}</span
          >
        </nav>

        <header class="challenge-hero">
          <div>
            <p class="eyebrow">{{ currentTask.category }} · {{ currentTask.concept }}</p>
            <h1>{{ currentTask.title }}</h1>
            <p>{{ currentTask.subtitle }}</p>
          </div>
          <div class="challenge-meta">
            <span>{{ currentTask.difficulty }}</span>
            <span>{{ currentTask.estimatedMinutes }}</span>
          </div>
        </header>

        <section class="challenge-workspace">
          <div class="instructions-panel">
            <p class="panel-label">Task</p>
            <section>
              <h2>Problem</h2>
              <p>{{ currentTask.problem }}</p>
            </section>
            <section>
              <h2>Goal</h2>
              <p>{{ currentTask.goal }}</p>
            </section>
            <section>
              <h2>Constraints</h2>
              <ul class="constraint-list">
                @for (constraint of currentTask.constraints; track constraint) {
                  <li>{{ constraint }}</li>
                }
              </ul>
            </section>
            <section>
              <h2>File to edit</h2>
              <div class="file-path">
                <code>{{ currentTask.filePath }}</code>
                <button
                  type="button"
                  (click)="copyPath(currentTask.filePath)"
                  [attr.aria-label]="copyLabel() + ' file path'"
                >
                  {{ copyLabel() }}
                </button>
              </div>
            </section>
            @if (currentTask.id === 'task-01') {
              <p class="console-tip">
                <strong>Tip:</strong> The browser console is part of your debugging toolkit.
              </p>
            }
            <section class="hints-section">
              <h2>Hints</h2>
              @for (hint of currentTask.hints; track hint; let index = $index) {
                <details>
                  <summary>Hint {{ index + 1 }}</summary>
                  <p>{{ hint }}</p>
                </details>
              }
            </section>
          </div>

          <div class="live-panel">
            <div class="panel-heading">
              <div>
                <p class="panel-label">Live example</p>
                <h2>Try the behavior</h2>
              </div>
              <span class="live-badge"><i></i> Live</span>
            </div>
            @if (taskComponent(); as component) {
              <app-task-runner [component]="component" />
            }
          </div>
        </section>

        <section class="checker-panel" aria-labelledby="checker-title">
          <div>
            <p class="panel-label">Runtime checker</p>
            <h2 id="checker-title">Does the behavior hold?</h2>
            <p>The checker exercises the live component through several state transitions.</p>
          </div>
          <button
            class="check-button"
            type="button"
            [disabled]="checking()"
            (click)="runCheck(currentTask.id)"
          >
            @if (checking()) {
              Checking…
            } @else {
              Check solution
            }
          </button>
        </section>

        <div class="result-region" aria-live="polite">
          @if (result(); as checkResult) {
            <section
              class="check-result"
              [class.success]="checkResult.passed"
              [class.failure]="!checkResult.passed"
            >
              <span class="result-icon" aria-hidden="true">{{
                checkResult.passed ? '✓' : '!'
              }}</span>
              <div>
                <h2>{{ checkResult.title }}</h2>
                <p>{{ checkResult.message }}</p>
                @if (checkResult.passed) {
                  <p class="key-idea">
                    <strong>Key idea:</strong> {{ currentTask.successExplanation }}
                  </p>
                  <div class="result-actions">
                    <a class="secondary-button" routerLink="/">Back to challenges</a>
                    @if (nextTask(); as next) {
                      <a class="primary-button" [routerLink]="['/tasks', next.slug]"
                        >Next challenge <span aria-hidden="true">→</span></a
                      >
                    }
                  </div>
                } @else if (debugMode() && checkResult.details?.length) {
                  <ul class="debug-details">
                    @for (detail of checkResult.details; track detail) {
                      <li>{{ detail }}</li>
                    }
                  </ul>
                }
              </div>
            </section>
          } @else {
            <p class="neutral-result">
              Not checked yet. Edit the file, let Angular recompile, then run the checker.
            </p>
          }
        </div>
      </div>
    } @else {
      <div class="page not-found">
        <p class="eyebrow">Challenge not found</p>
        <h1>This route does not match a workshop task.</h1>
        <a class="primary-button" routerLink="/">Back to challenges</a>
      </div>
    }
  `,
})
export class TaskShellComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly checker = inject(TaskCheckerService);
  private readonly progress = inject(ProgressService);
  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });
  private readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  @ViewChild(TaskRunnerComponent) private runner?: TaskRunnerComponent;

  protected readonly tasks = WORKSHOP_TASKS;
  protected readonly task = computed(() => findTask(this.params().get('slug')));
  protected readonly taskComponent = computed(() => {
    const task = this.task();
    return task ? TASK_COMPONENTS[task.id] : undefined;
  });
  protected readonly nextTask = computed(() => {
    const task = this.task();
    return task ? WORKSHOP_TASKS[task.number] : undefined;
  });
  protected readonly debugMode = computed(() => this.queryParams().get('debugTasks') === 'true');
  protected readonly checking = signal(false);
  protected readonly result = signal<TaskCheckResult | null>(null);
  protected readonly copyLabel = signal('Copy');

  constructor() {
    effect(() => {
      this.task()?.id;
      this.result.set(null);
      this.copyLabel.set('Copy');
    });
  }

  protected async runCheck(taskId: string): Promise<void> {
    if (!this.runner) return;
    this.checking.set(true);
    this.result.set(null);

    try {
      const result = await this.checker.check(
        taskId,
        this.runner.element.nativeElement,
        this.runner.initializationFailed,
      );
      this.result.set(result);
      if (result.passed) this.progress.markSolved(taskId);
    } finally {
      this.checking.set(false);
    }
  }

  protected async copyPath(path: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(path);
      this.copyLabel.set('Copied');
      setTimeout(() => this.copyLabel.set('Copy'), 1500);
    } catch {
      this.copyLabel.set('Select path');
    }
  }
}
