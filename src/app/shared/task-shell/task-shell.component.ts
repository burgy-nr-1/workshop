import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WORKSHOP_TASKS, findTask } from '../../data/workshop-tasks';
import { TASK_COMPONENTS } from '../../tasks/task-components';
import { ProgressService } from '../progress.service';
import { TaskCheckerService } from '../task-checker/task-checker.service';
import { TaskCheckResult } from '../task-checker/task-checker.types';
import { TaskRunnerComponent } from '../task-runner/task-runner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-shell',
  templateUrl: './task-shell.component.html',
  styleUrl: './task-shell.component.scss',
  imports: [RouterLink, TaskRunnerComponent],
})
export class TaskShellComponent {
  @ViewChild(TaskRunnerComponent) private runner?: TaskRunnerComponent;

  private readonly route = inject(ActivatedRoute);
  private readonly checker = inject(TaskCheckerService);
  private readonly progress = inject(ProgressService);
  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });
  private readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

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
  protected readonly copyLabel = signal('Kopieren');

  constructor() {
    effect(() => {
      this.task()?.id;
      this.result.set(null);
      this.copyLabel.set('Kopieren');
    });
  }

  protected async runCheck(taskId: string): Promise<void> {
    if (!this.runner) {
      return;
    }
    this.checking.set(true);
    this.result.set(null);

    try {
      const result = await this.checker.check(
        taskId,
        this.runner.element.nativeElement,
        this.runner.initializationFailed,
      );
      this.result.set(result);
      if (result.passed) {
        this.progress.markSolved(taskId);
      }
    } finally {
      this.checking.set(false);
    }
  }

  protected async copyPath(path: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(path);
      this.copyLabel.set('Kopiert');
      setTimeout(() => this.copyLabel.set('Kopieren'), 1500);
    } catch {
      this.copyLabel.set('Pfad markieren');
    }
  }
}
